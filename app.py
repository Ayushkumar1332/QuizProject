
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('quiz.html')

if __name__ == '__main__':
    app.run(debug=True)


from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# MySQL Configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # Apna MySQL password yahan dalein
app.config['MYSQL_DB'] = 'quiz_master'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


# 1. Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
  data = request.json
  name = data.get('name')
  email = data.get('email').lower()
  password = data.get('password')

  cur = mysql.connection.cursor()
  cur.execute('SELECT * FROM users WHERE email = %s', (email,))
  existing_user = cur.fetchone()

  if existing_user:
    cur.close()
    return jsonify({'success': False, 'message': 'Email already exists!'}), 400

  cur.execute(
      'INSERT INTO users (name, email, password, coins, lives, streak,'
      ' best_score, quizzes_played) VALUES (%s, %s, %s, 100, 5, 1, 0, 0)',
      (name, email, password),
  )
  mysql.connection.commit()

  cur.execute('SELECT * FROM users WHERE email = %s', (email,))
  user = cur.fetchone()
  cur.close()

  return jsonify({'success': True, 'user': user})


# 2. Login Route
@app.route('/api/login', methods=['POST'])
def login():
  data = request.json
  email = data.get('email').lower()
  password = data.get('password')

  cur = mysql.connection.cursor()
  cur.execute(
      'SELECT * FROM users WHERE email = %s AND password = %s', (email, password)
  )
  user = cur.fetchone()
  cur.close()

  if not user:
    return (
        jsonify({'success': False, 'message': 'Invalid email or password'}),
        401,
    )

  return jsonify({'success': True, 'user': user})


# 3. Get Questions by Category
@app.route('/api/questions/<category>', methods=['GET'])
def get_questions(category):
  cur = mysql.connection.cursor()
  cur.execute('SELECT * FROM questions WHERE category = %s', (category,))
  questions = cur.fetchall()
  cur.close()

  # Format matching frontend structure
  formatted_questions = []
  for q in questions:
    formatted_questions.append({
        'id': q['id'],
        'category': q['category'],
        'question': q['question'],
        'options': [q['option1'], q['option2'], q['option3'], q['option4']],
        'answer': q['correct_answer'],
    })

  return jsonify(formatted_questions)


# 4. Save Quiz Result & Update User Stats
@app.route('/api/save-score', methods=['POST'])
def save_score():
  data = request.json
  user_id = data.get('userId')
  category = data.get('category')
  mode = data.get('mode')
  score = data.get('score')
  correct = data.get('correct')
  wrong = data.get('wrong')
  percentage = data.get('percentage')
  earned_coins = data.get('earnedCoins')

  cur = mysql.connection.cursor()

  # Insert score history
  cur.execute(
      'INSERT INTO scores (user_id, category, mode, score, correct, wrong,'
      ' percentage) VALUES (%s, %s, %s, %s, %s, %s, %s)',
      (user_id, category, mode, score, correct, wrong, percentage),
  )

  # Update user profile stats
  cur.execute(
      'UPDATE users SET coins = coins + %s, quizzes_played = quizzes_played + 1,'
      ' best_score = GREATEST(best_score, %s) WHERE id = %s',
      (earned_coins, score, user_id),
  )

  mysql.connection.commit()

  # Fetch updated user details
  cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))
  updated_user = cur.fetchone()
  cur.close()

  return jsonify({'success': True, 'user': updated_user})


# 5. Admin: Add Question
@app.route('/api/admin/add-question', methods=['POST'])
def add_question():
  data = request.json
  category = data.get('category')
  question = data.get('question')
  options = data.get('options')
  answer = data.get('answer')

  cur = mysql.connection.cursor()
  cur.execute(
      'INSERT INTO questions (category, question, option1, option2, option3,'
      ' option4, correct_answer) VALUES (%s, %s, %s, %s, %s, %s, %s)',
      (
          category,
          question,
          options[0],
          options[1],
          options[2],
          options[3],
          answer,
      ),
  )
  mysql.connection.commit()
  cur.close()

  return jsonify({'success': True, 'message': 'Question added successfully'})


# 6. Admin: Get All Questions & Users
@app.route('/api/admin/data', methods=['GET'])
def get_admin_data():
  cur = mysql.connection.cursor()
  cur.execute('SELECT * FROM questions')
  questions = cur.fetchall()

  cur.execute('SELECT id, name, email, coins, best_score, quizzes_played FROM users')
  users = cur.fetchall()
  cur.close()

  return jsonify({'questions': questions, 'users': users})


# 7. Admin: Delete Question
@app.route('/api/admin/question/<int:q_id>', methods=['DELETE'])
def delete_question(q_id):
  cur = mysql.connection.cursor()
  cur.execute('DELETE FROM questions WHERE id = %s', (q_id,))
  mysql.connection.commit()
  cur.close()

  return jsonify({'success': True, 'message': 'Question deleted'})


if __name__ == '__main__':
  app.run(debug=True, port=5000)