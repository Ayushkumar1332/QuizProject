/* =====================================================
   QUIZ MASTER
   Frontend Version
   Data Storage: localStorage
===================================================== */


/* ================= GLOBAL DATA ================= */

let users = JSON.parse(
    localStorage.getItem("quizMasterUsers") || "[]"
);

let currentUser = JSON.parse(
    localStorage.getItem("quizMasterCurrentUser") || "null"
);

let customQuestions = JSON.parse(
    localStorage.getItem("quizMasterQuestions") || "[]"
);

let currentMode = "classic";
let currentCategory = "Computer Science";

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer = null;
let timerInterval = null;
let timeLeft = 30;


/* ================= DEFAULT QUESTIONS ================= */
/* 20 questions in each major category */

const defaultQuestions = {

    "Computer Science": [

        {
            question: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Control Processing User"
            ],
            answer: 0
        },

        {
            question: "Which language is mainly used to structure web pages?",
            options: [
                "HTML",
                "Python",
                "SQL",
                "C++"
            ],
            answer: 0
        },

        {
            question: "Which language is used to style web pages?",
            options: [
                "HTML",
                "CSS",
                "SQL",
                "Java"
            ],
            answer: 1
        },

        {
            question: "Which language is commonly used to add interactivity to websites?",
            options: [
                "CSS",
                "HTML",
                "JavaScript",
                "SQL"
            ],
            answer: 2
        },

        {
            question: "What does RAM stand for?",
            options: [
                "Random Access Memory",
                "Read Access Memory",
                "Rapid Application Memory",
                "Random Application Module"
            ],
            answer: 0
        },

        {
            question: "Which device is used to input text?",
            options: [
                "Monitor",
                "Keyboard",
                "Speaker",
                "Projector"
            ],
            answer: 1
        },

        {
            question: "Which one is an operating system?",
            options: [
                "Windows",
                "Google",
                "HTML",
                "Python"
            ],
            answer: 0
        },

        {
            question: "What does URL stand for?",
            options: [
                "Uniform Resource Locator",
                "Universal Record Link",
                "User Resource Location",
                "Uniform Read Link"
            ],
            answer: 0
        },

        {
            question: "Which data structure follows FIFO?",
            options: [
                "Stack",
                "Queue",
                "Tree",
                "Graph"
            ],
            answer: 1
        },

        {
            question: "Which data structure follows LIFO?",
            options: [
                "Queue",
                "Stack",
                "Array",
                "Graph"
            ],
            answer: 1
        },

        {
            question: "Which is a database management system?",
            options: [
                "MySQL",
                "HTML",
                "CSS",
                "Photoshop"
            ],
            answer: 0
        },

        {
            question: "What does SQL stand for?",
            options: [
                "Structured Query Language",
                "Simple Query List",
                "System Query Language",
                "Structured Question Logic"
            ],
            answer: 0
        },

        {
            question: "Which protocol is commonly used for secure web browsing?",
            options: [
                "HTTP",
                "HTTPS",
                "FTP",
                "SMTP"
            ],
            answer: 1
        },

        {
            question: "Which one is a programming language?",
            options: [
                "Python",
                "Windows",
                "Chrome",
                "Linux"
            ],
            answer: 0
        },

        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automated Internet",
                "Advanced Input",
                "Application Interface"
            ],
            answer: 0
        },

        {
            question: "Which company developed the Android operating system?",
            options: [
                "Microsoft",
                "Google",
                "Apple",
                "IBM"
            ],
            answer: 1
        },

        {
            question: "Which symbol is commonly used for comments in JavaScript?",
            options: [
                "//",
                "##",
                "<!--",
                "**"
            ],
            answer: 0
        },

        {
            question: "Which is an example of cloud storage?",
            options: [
                "Google Drive",
                "Keyboard",
                "RAM",
                "CPU"
            ],
            answer: 0
        },

        {
            question: "Which technology is used to create database queries?",
            options: [
                "SQL",
                "CSS",
                "HTML",
                "JPEG"
            ],
            answer: 0
        },

        {
            question: "Which component performs calculations in a computer?",
            options: [
                "CPU",
                "Monitor",
                "Keyboard",
                "Printer"
            ],
            answer: 0
        }

    ],


    "General Science": [

        {
            question: "What is the chemical formula of water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            answer: 0
        },

        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Venus", "Jupiter"],
            answer: 1
        },

        {
            question: "What gas do humans need for respiration?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 0
        },

        {
            question: "What is the center of an atom called?",
            options: ["Electron", "Nucleus", "Proton", "Shell"],
            answer: 1
        },

        {
            question: "Which organ pumps blood?",
            options: ["Lungs", "Heart", "Kidney", "Brain"],
            answer: 1
        },

        {
            question: "What is the boiling point of water at sea level?",
            options: ["50°C", "75°C", "100°C", "150°C"],
            answer: 2
        },

        {
            question: "Which vitamin is produced by sunlight?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            answer: 3
        },

        {
            question: "What force pulls objects toward Earth?",
            options: ["Friction", "Gravity", "Magnetism", "Pressure"],
            answer: 1
        },

        {
            question: "Which gas do plants absorb?",
            options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Helium"],
            answer: 1
        },

        {
            question: "What is the largest organ of the human body?",
            options: ["Heart", "Skin", "Liver", "Brain"],
            answer: 1
        },

        {
            question: "Which blood cells fight infection?",
            options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
            answer: 1
        },

        {
            question: "What is the nearest star to Earth?",
            options: ["Moon", "Sun", "Sirius", "Polaris"],
            answer: 1
        },

        {
            question: "Which planet has rings?",
            options: ["Mercury", "Saturn", "Mars", "Venus"],
            answer: 1
        },

        {
            question: "What is CO2?",
            options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
            answer: 1
        },

        {
            question: "Which part of the plant performs photosynthesis?",
            options: ["Root", "Stem", "Leaf", "Flower"],
            answer: 2
        },

        {
            question: "What is the unit of electric current?",
            options: ["Volt", "Ampere", "Watt", "Ohm"],
            answer: 1
        },

        {
            question: "Which is the hardest natural substance?",
            options: ["Iron", "Gold", "Diamond", "Silver"],
            answer: 2
        },

        {
            question: "Which organ is mainly responsible for breathing?",
            options: ["Heart", "Lungs", "Kidney", "Stomach"],
            answer: 1
        },

        {
            question: "What is the freezing point of water?",
            options: ["0°C", "10°C", "50°C", "100°C"],
            answer: 0
        },

        {
            question: "Which particle has a negative charge?",
            options: ["Proton", "Neutron", "Electron", "Nucleus"],
            answer: 2
        }

    ],


    "Mathematics": [

        {
            question: "What is 10 + 15?",
            options: ["20", "25", "30", "35"],
            answer: 1
        },

        {
            question: "What is 12 × 5?",
            options: ["50", "55", "60", "65"],
            answer: 2
        },

        {
            question: "What is 100 ÷ 4?",
            options: ["20", "25", "30", "40"],
            answer: 1
        },

        {
            question: "What is the square of 10?",
            options: ["20", "50", "100", "200"],
            answer: 2
        },

        {
            question: "What is 15% of 100?",
            options: ["10", "15", "20", "25"],
            answer: 1
        },

        {
            question: "What is the value of 5²?",
            options: ["10", "15", "25", "30"],
            answer: 2
        },

        {
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            answer: 1
        },

        {
            question: "How many degrees are in a right angle?",
            options: ["45", "90", "180", "360"],
            answer: 1
        },

        {
            question: "What is 9 × 9?",
            options: ["72", "81", "90", "99"],
            answer: 1
        },

        {
            question: "What is the square root of 64?",
            options: ["6", "7", "8", "9"],
            answer: 2
        },

        {
            question: "What is 50 - 18?",
            options: ["22", "32", "42", "52"],
            answer: 1
        },

        {
            question: "What is 7 × 8?",
            options: ["48", "54", "56", "64"],
            answer: 2
        },

        {
            question: "What is 144 ÷ 12?",
            options: ["10", "11", "12", "14"],
            answer: 2
        },

        {
            question: "What is 2³?",
            options: ["4", "6", "8", "10"],
            answer: 2
        },

        {
            question: "What is the perimeter of a square with side 5?",
            options: ["10", "15", "20", "25"],
            answer: 2
        },

        {
            question: "What is 25 + 25?",
            options: ["40", "45", "50", "55"],
            answer: 2
        },

        {
            question: "What is 200 - 75?",
            options: ["115", "125", "135", "145"],
            answer: 1
        },

        {
            question: "What is 6²?",
            options: ["12", "24", "36", "42"],
            answer: 2
        },

        {
            question: "What is 3 × 11?",
            options: ["22", "33", "44", "55"],
            answer: 1
        },

        {
            question: "What is half of 80?",
            options: ["20", "30", "40", "50"],
            answer: 2
        }

    ],


    "General Knowledge": [

        {
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
            answer: 1
        },

        {
            question: "Which is the largest continent?",
            options: ["Africa", "Asia", "Europe", "Australia"],
            answer: 1
        },

        {
            question: "Which is the largest ocean?",
            options: ["Atlantic", "Indian", "Pacific", "Arctic"],
            answer: 2
        },

        {
            question: "Who wrote the national anthem of India?",
            options: ["Rabindranath Tagore", "Mahatma Gandhi", "Jawaharlal Nehru", "Bankim Chandra"],
            answer: 0
        },

        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },

        {
            question: "Which country is famous for the Eiffel Tower?",
            options: ["Italy", "France", "Germany", "Spain"],
            answer: 1
        },

        {
            question: "Which is the smallest continent?",
            options: ["Europe", "Australia", "Asia", "Africa"],
            answer: 1
        },

        {
            question: "What is the currency of Japan?",
            options: ["Yuan", "Won", "Yen", "Dollar"],
            answer: 2
        },

        {
            question: "Which country has the largest population?",
            options: ["India", "USA", "Russia", "Japan"],
            answer: 0
        },

        {
            question: "What is the national animal of India?",
            options: ["Lion", "Tiger", "Elephant", "Leopard"],
            answer: 1
        },

        {
            question: "Which is the longest river in India?",
            options: ["Ganga", "Yamuna", "Godavari", "Narmada"],
            answer: 0
        },

        {
            question: "Which planet is the largest?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 2
        },

        {
            question: "Which is the largest country by area?",
            options: ["China", "USA", "Russia", "Canada"],
            answer: 2
        },

        {
            question: "What is the capital of France?",
            options: ["Rome", "Paris", "Berlin", "Madrid"],
            answer: 1
        },

        {
            question: "Which language has the most native speakers?",
            options: ["English", "Hindi", "Mandarin Chinese", "Spanish"],
            answer: 2
        },

        {
            question: "Which is the fastest land animal?",
            options: ["Lion", "Cheetah", "Horse", "Tiger"],
            answer: 1
        },

        {
            question: "How many days are there in a leap year?",
            options: ["365", "366", "364", "367"],
            answer: 1
        },

        {
            question: "Which is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
            answer: 1
        },

        {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "India", "Thailand"],
            answer: 1
        },

        {
            question: "How many colors are traditionally present in a rainbow?",
            options: ["5", "6", "7", "8"],
            answer: 2
        }

    ],


    "English": [

        {
            question: "Choose the correct spelling.",
            options: ["Recieve", "Receive", "Receeve", "Receve"],
            answer: 1
        },

        {
            question: "What is the opposite of 'hot'?",
            options: ["Warm", "Cold", "Heat", "Fire"],
            answer: 1
        },

        {
            question: "Choose the correct article: ___ apple.",
            options: ["A", "An", "The", "No article"],
            answer: 1
        },

        {
            question: "What is the plural of 'child'?",
            options: ["Childs", "Childes", "Children", "Childrens"],
            answer: 2
        },

        {
            question: "Which word is a noun?",
            options: ["Run", "Beautiful", "Teacher", "Quickly"],
            answer: 2
        },

        {
            question: "Which word is a verb?",
            options: ["Run", "Blue", "Table", "Beautiful"],
            answer: 0
        },

        {
            question: "What is the synonym of 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Weak"],
            answer: 1
        },

        {
            question: "What is the opposite of 'early'?",
            options: ["Fast", "Late", "Quick", "Soon"],
            answer: 1
        },

        {
            question: "Choose the correct sentence.",
            options: [
                "He go to school.",
                "He goes to school.",
                "He going school.",
                "He gone school."
            ],
            answer: 1
        },

        {
            question: "Which is a pronoun?",
            options: ["Book", "He", "Run", "Beautiful"],
            answer: 1
        },

        {
            question: "What is the past tense of 'go'?",
            options: ["Goed", "Gone", "Went", "Going"],
            answer: 2
        },

        {
            question: "What is the opposite of 'strong'?",
            options: ["Powerful", "Weak", "Hard", "Large"],
            answer: 1
        },

        {
            question: "Which word means 'very large'?",
            options: ["Tiny", "Huge", "Small", "Short"],
            answer: 1
        },

        {
            question: "Choose the correct spelling.",
            options: ["Beautiful", "Beautifull", "Beutiful", "Beauteful"],
            answer: 0
        },

        {
            question: "What is the plural of 'mouse'?",
            options: ["Mouses", "Mice", "Mouse", "Meese"],
            answer: 1
        },

        {
            question: "Which is an adjective?",
            options: ["Quickly", "Beautiful", "Run", "Teacher"],
            answer: 1
        },

        {
            question: "What is the synonym of 'begin'?",
            options: ["Start", "Finish", "Stop", "End"],
            answer: 0
        },

        {
            question: "Which sentence is grammatically correct?",
            options: [
                "They is happy.",
                "They are happy.",
                "They am happy.",
                "They be happy."
            ],
            answer: 1
        },

        {
            question: "What is the opposite of 'ancient'?",
            options: ["Old", "Modern", "Past", "Historic"],
            answer: 1
        },

        {
            question: "Which word is an adverb?",
            options: ["Slowly", "Slow", "Slowness", "Slowed"],
            answer: 0
        }

    ],


    "Current Affairs": [

        {
            question: "Which technology is widely associated with conversational AI?",
            options: ["Artificial Intelligence", "Bluetooth", "USB", "GPS"],
            answer: 0
        },

        {
            question: "What does EV commonly stand for?",
            options: ["Electric Vehicle", "Energy Value", "Electronic Voice", "Engine Version"],
            answer: 0
        },

        {
            question: "What does UPI stand for?",
            options: [
                "Unified Payments Interface",
                "Universal Payment Internet",
                "United Payment India",
                "User Payment Interface"
            ],
            answer: 0
        },

        {
            question: "Which organization manages the Indian space programme?",
            options: ["ISRO", "NASA", "ESA", "JAXA"],
            answer: 0
        },

        {
            question: "What does GDP stand for?",
            options: [
                "Gross Domestic Product",
                "General Domestic Price",
                "Global Development Product",
                "Gross Development Plan"
            ],
            answer: 0
        },

        {
            question: "Which technology is used for decentralized digital records?",
            options: ["Blockchain", "Bluetooth", "HTML", "Wi-Fi"],
            answer: 0
        },

        {
            question: "What does 5G refer to?",
            options: [
                "Fifth generation mobile network",
                "Fifth generation computer",
                "Five gigabyte storage",
                "Five global systems"
            ],
            answer: 0
        },

        {
            question: "Which renewable energy source uses sunlight?",
            options: ["Solar energy", "Wind energy", "Hydropower", "Geothermal"],
            answer: 0
        },

        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automated Internet",
                "Advanced Information",
                "Application Input"
            ],
            answer: 0
        },

        {
            question: "What is a common use of GPS?",
            options: [
                "Navigation",
                "Cooking",
                "Printing",
                "Typing"
            ],
            answer: 0
        },

        {
            question: "Which technology helps protect websites using encrypted connections?",
            options: ["HTTPS", "HTTP", "FTP", "SMTP"],
            answer: 0
        },

        {
            question: "What does the term 'startup' usually refer to?",
            options: [
                "A new business",
                "A government building",
                "A sports team",
                "A computer cable"
            ],
            answer: 0
        },

        {
            question: "Which sector includes banking and financial services?",
            options: ["Finance", "Agriculture", "Mining", "Construction"],
            answer: 0
        },

        {
            question: "What is cybersecurity mainly concerned with?",
            options: [
                "Protecting digital systems",
                "Making food",
                "Building roads",
                "Designing clothes"
            ],
            answer: 0
        },

        {
            question: "Which technology enables devices to communicate over short distances wirelessly?",
            options: ["Bluetooth", "HTML", "SQL", "CPU"],
            answer: 0
        },

        {
            question: "What is cloud computing?",
            options: [
                "Using remote computing resources over the internet",
                "Using only local computers",
                "Writing documents",
                "Printing files"
            ],
            answer: 0
        },

        {
            question: "What does IoT stand for?",
            options: [
                "Internet of Things",
                "Internet of Technology",
                "Input of Things",
                "Information Online Technology"
            ],
            answer: 0
        },

        {
            question: "Which field focuses on creating intelligent computer systems?",
            options: [
                "Artificial Intelligence",
                "Geography",
                "Literature",
                "Architecture"
            ],
            answer: 0
        },

        {
            question: "What is digital payment?",
            options: [
                "Electronic transfer of money",
                "Paper-only payment",
                "Physical delivery",
                "Manual calculation"
            ],
            answer: 0
        },

        {
            question: "Which technology is strongly associated with electric cars?",
            options: [
                "Battery technology",
                "Steam engines",
                "Film cameras",
                "Typewriters"
            ],
            answer: 0
        }

    ]

};


/* ================= HELPER FUNCTIONS ================= */

function saveUsers() {

    localStorage.setItem(
        "quizMasterUsers",
        JSON.stringify(users)
    );

}


function saveCurrentUser() {

    localStorage.setItem(
        "quizMasterCurrentUser",
        JSON.stringify(currentUser)
    );

}


function saveCustomQuestions() {

    localStorage.setItem(
        "quizMasterQuestions",
        JSON.stringify(customQuestions)
    );

}


function getAllQuestions(category) {

    const defaultList =
        defaultQuestions[category] || [];

    const customList =
        customQuestions.filter(
            q => q.category === category
        );

    const allQuestions = [
        ...defaultList,
        ...customList
    ];

    const seen = new Set();

    return allQuestions.filter(q => {
        const key = String(q.question || "")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });

}


/* ================= SPLASH ================= */

setTimeout(() => {

    document
        .getElementById("splashScreen")
        .classList.add("hidden");

    if (currentUser) {

        showApp();

    } else {

        document
            .getElementById("authScreen")
            .classList.remove("hidden");

    }

}, 3000);


/* ================= AUTH ================= */

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");


document
    .getElementById("switchAuth")
    .addEventListener("click", () => {

        loginForm.classList.toggle("hidden");
        signupForm.classList.toggle("hidden");

        const isSignup =
            !signupForm.classList.contains("hidden");

        document.getElementById("authTitle").textContent =
            isSignup
                ? "Create Your Account"
                : "Welcome to Quiz Master";

        document.getElementById("authSubtitle").textContent =
            isSignup
                ? "Create your account to start playing."
                : "Login to continue your quiz journey.";

        document.getElementById("switchAuth").textContent =
            isSignup
                ? "Login"
                : "Create Account";

        document.getElementById("switchText").textContent =
            isSignup
                ? "Already have an account?"
                : "Don't have an account?";

    });


/* LOGIN */

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const user =
        users.find(
            u =>
                u.email === email &&
                u.password === password
        );

    if (!user) {

        alert(
            "Invalid email or password."
        );

        return;
    }

    currentUser = user;

    saveCurrentUser();

    showApp();

});


/* SIGNUP */

signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
        document
            .getElementById("signupName")
            .value
            .trim();

    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("signupPassword")
            .value;

    if (
        users.some(
            u => u.email === email
        )
    ) {

        alert(
            "An account with this email already exists."
        );

        return;
    }


    const user = {

        id: Date.now(),

        name,

        email,

        password,

        coins: 100,

        lives: 5,

        streak: 1,

        bestScore: 0,

        quizzesPlayed: 0,

        scores: [],

        lastLogin: new Date().toDateString()

    };


    users.push(user);

    currentUser = user;

    saveUsers();

    saveCurrentUser();

    alert(
        "Account created successfully."
    );

    showApp();

});


/* GOOGLE DEMO LOGIN */

document
    .getElementById("googleLogin")
    .addEventListener("click", () => {

        const email =
            "google.user@quizmaster.demo";

        let user =
            users.find(
                u => u.email === email
            );

        if (!user) {

            user = {

                id: Date.now(),

                name: "Google User",
                email,
                password: "google-login",
                coins: 100,
                lives: 5,
                streak: 1,
                bestScore: 0,
                quizzesPlayed: 0,
                scores: []

            };

            users.push(user);

            saveUsers();

        }

        currentUser = user;

        saveCurrentUser();

        showApp();

    });


/* FORGOT PASSWORD */

document
    .getElementById("forgotPassword")
    .addEventListener("click", () => {

        const email =
            prompt(
                "Enter your registered email:"
            );

        if (!email) return;

        const user =
            users.find(
                u =>
                    u.email ===
                    email.trim().toLowerCase()
            );

        if (!user) {

            alert(
                "No account found with this email."
            );

            return;

        }

        const newPassword =
            prompt(
                "Enter your new password:"
            );

        if (!newPassword) return;

        user.password =
            newPassword;

        saveUsers();

        alert(
            "Password reset successfully."
        );

    });


/* ================= APP ================= */

function showApp() {

    document
        .getElementById("authScreen")
        .classList.add("hidden");

    document
        .getElementById("quizScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("appScreen")
        .classList.remove("hidden");

    updateDashboard();

}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    if (!currentUser) return;

    document
        .getElementById("userName")
        .textContent =
        currentUser.name;

    document
        .getElementById("coinCount")
        .textContent =
        currentUser.coins || 0;

    document
        .getElementById("livesCount")
        .textContent =
        currentUser.lives ?? 5;

    document
        .getElementById("streakCount")
        .textContent =
        currentUser.streak || 0;

    document
        .getElementById("bestScore")
        .textContent =
        currentUser.bestScore || 0;

}


/* ================= 3 DOT MENU ================= */

document
    .getElementById("menuBtn")
    .addEventListener("click", () => {

        document
            .getElementById("dropdownMenu")
            .classList.toggle("hidden");

    });


document
    .getElementById("logoutBtn")
    .addEventListener("click", logout);


function logout() {

    currentUser = null;

    localStorage.removeItem(
        "quizMasterCurrentUser"
    );

    document
        .getElementById("appScreen")
        .classList.add("hidden");

    document
        .getElementById("authScreen")
        .classList.remove("hidden");

    loginForm.reset();

}


/* DELETE ACCOUNT */

document
    .getElementById("deleteAccountBtn")
    .addEventListener(
        "click",
        deleteAccount
    );


function deleteAccount() {

    if (!currentUser) return;

    const confirmDelete =
        confirm(
            "This will permanently delete your account and quiz history. Continue?"
        );

    if (!confirmDelete) return;

    users =
        users.filter(
            u =>
                u.id !==
                currentUser.id
        );

    saveUsers();

    localStorage.removeItem(
        "quizMasterCurrentUser"
    );

    currentUser = null;

    alert(
        "Your account has been deleted."
    );

    document
        .getElementById("appScreen")
        .classList.add("hidden");

    document
        .getElementById("authScreen")
        .classList.remove("hidden");

}


/* ================= THEME ================= */

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document
            .body
            .classList.toggle("dark");

        localStorage.setItem(
            "quizMasterTheme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });


if (
    localStorage.getItem(
        "quizMasterTheme"
    ) === "dark"
) {

    document
        .body
        .classList.add("dark");

}


/* ================= GAME MODES ================= */

document
    .querySelectorAll(".mode-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                currentMode =
                    card.dataset.mode;

                startQuiz(
                    currentCategory
                );

            }
        );

    });


/* ================= CATEGORIES ================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                currentCategory =
                    card.dataset.category;

                currentMode =
                    "classic";

                startQuiz(
                    currentCategory
                );

            }
        );

    });


/* ================= START QUIZ ================= */

function startQuiz(category) {

    quizQuestions =
        getAllQuestions(category);

    if (
        quizQuestions.length === 0
    ) {

        alert(
            "No questions are available for this category."
        );

        return;

    }


    quizQuestions =
        [...quizQuestions]
            .sort(
                () => Math.random() - 0.5
            );


    quizQuestions =
        quizQuestions.slice(
            0,
            Math.min(
                20,
                quizQuestions.length
            )
        );


    currentQuestionIndex = 0;

    score = 0;

    correctCount = 0;

    wrongCount = 0;

    selectedAnswer = null;


    document
        .getElementById("appScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("quizScreen")
        .classList.remove("hidden");

    document
        .getElementById("quizCategory")
        .textContent =
        category;


    showQuestion();

}


/* ================= SHOW QUESTION ================= */

function showQuestion() {

    clearInterval(timerInterval);

    const question =
        quizQuestions[
        currentQuestionIndex
        ];

    selectedAnswer = null;

    document
        .getElementById("questionNumber")
        .textContent =
        `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`;

    document
        .getElementById("quizScore")
        .textContent =
        score;


    document
        .getElementById("questionText")
        .textContent =
        question.question;


    const optionsContainer =
        document
            .getElementById(
                "optionsContainer"
            );

    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "option";

            button.textContent =
                option;

            button.addEventListener(
                "click",
                () =>
                    selectAnswer(
                        index,
                        button
                    )
            );

            optionsContainer.appendChild(
                button
            );

        }
    );


    const progress =
        (
            (currentQuestionIndex + 1)
            /
            quizQuestions.length
        ) * 100;

    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    startTimer();

}


/* ================= TIMER ================= */

function startTimer() {

    if (currentMode === "practice") {

        document
            .getElementById("timer")
            .textContent =
            "Practice";

        return;

    }


    if (currentMode === "speed") {

        timeLeft = 10;

    } else {

        timeLeft = 30;

    }


    document
        .getElementById("timer")
        .textContent =
        timeLeft;


    timerInterval =
        setInterval(
            () => {

                timeLeft--;

                document
                    .getElementById("timer")
                    .textContent =
                    timeLeft;


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    timeUp();

                }

            },
            1000
        );

}


/* ================= SELECT ANSWER ================= */

function selectAnswer(
    index,
    button
) {

    if (
        selectedAnswer !== null
    ) return;

    selectedAnswer = index;

    clearInterval(timerInterval);


    const question =
        quizQuestions[
        currentQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".option"
        );


    buttons.forEach(
        btn =>
            btn.disabled = true
    );


    if (
        index ===
        question.answer
    ) {

        button.classList.add(
            "correct"
        );

        score += 10;

        correctCount++;

        currentUser.coins =
            (currentUser.coins || 0)
            + 10;

    } else {

        button.classList.add(
            "wrong"
        );

        buttons[
            question.answer
        ].classList.add(
            "correct"
        );

        wrongCount++;

    }


    document
        .getElementById("quizScore")
        .textContent =
        score;

    saveUser();

    setTimeout(() => {
        nextQuestion();
    }, 700);

}


/* ================= TIME UP ================= */

function timeUp() {

    if (
        selectedAnswer !== null
    ) return;

    selectedAnswer = -1;

    wrongCount++;

    const question =
        quizQuestions[
        currentQuestionIndex
        ];

    const buttons =
        document.querySelectorAll(
            ".option"
        );

    buttons.forEach(
        btn =>
            btn.disabled = true
    );

    if (buttons[question.answer]) {

        buttons[
            question.answer
        ].classList.add(
            "correct"
        );

    }

}


/* ================= NEXT QUESTION ================= */

function nextQuestion() {

    if (
        selectedAnswer === null
    ) {

        alert(
            "Please select an answer first."
        );

        return;

    }


    currentQuestionIndex++;


    if (
        currentQuestionIndex
        >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    showQuestion();

}


/* ================= EXIT ================= */

document
    .getElementById("exitQuiz")
    .addEventListener(
        "click",
        () => {

            clearInterval(
                timerInterval
            );

            showApp();

        }
    );


/* ================= FINISH QUIZ ================= */

function finishQuiz() {

    clearInterval(
        timerInterval
    );


    const total =
        quizQuestions.length;

    const percentage =
        Math.round(
            (correctCount / total) * 100
        );


    const earnedCoins =
        correctCount * 10;


    currentUser.quizzesPlayed =
        (currentUser.quizzesPlayed || 0)
        + 1;


    if (
        score >
        (currentUser.bestScore || 0)
    ) {

        currentUser.bestScore =
            score;

    }


    currentUser.coins =
        (currentUser.coins || 0)
        + earnedCoins;


    if (
        !currentUser.scores
    ) {

        currentUser.scores = [];

    }


    currentUser.scores.push({

        category:
            currentCategory,

        mode:
            currentMode,

        score,

        correct:
            correctCount,

        wrong:
            wrongCount,

        percentage,

        date:
            new Date().toLocaleString()

    });


    if (
        currentUser.scores.length > 20
    ) {

        currentUser.scores =
            currentUser.scores.slice(-20);

    }


    saveUser();


    document
        .getElementById("quizScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document
        .getElementById("finalScore")
        .textContent =
        score;


    document
        .getElementById("finalPercentage")
        .textContent =
        percentage + "%";


    document
        .getElementById("correctAnswers")
        .textContent =
        correctCount;


    document
        .getElementById("wrongAnswers")
        .textContent =
        wrongCount;


    document
        .getElementById("earnedCoins")
        .textContent =
        earnedCoins;


    let message =
        "Keep practicing and improve your score.";

    if (percentage >= 80) {

        message =
            "Excellent performance! You are becoming a Quiz Master.";

    } else if (percentage >= 60) {

        message =
            "Great job! Keep improving your knowledge.";

    }


    document
        .getElementById("resultMessage")
        .textContent =
        message;

}


/* ================= PLAY AGAIN ================= */

document
    .getElementById("playAgain")
    .addEventListener(
        "click",
        () => {

            startQuiz(
                currentCategory
            );

        }
    );


/* ================= HOME ================= */

document
    .getElementById("homeBtn")
    .addEventListener(
        "click",
        showApp
    );


/* ================= PROFILE ================= */

document
    .getElementById("profileBtn")
    .addEventListener(
        "click",
        () => {

            updateProfile();

            openModal(
                "profileModal"
            );

        }
    );


function updateProfile() {

    document
        .getElementById("profileName")
        .textContent =
        currentUser.name;

    document
        .getElementById("profileEmail")
        .textContent =
        currentUser.email;

    document
        .getElementById("profileAvatar")
        .textContent =
        currentUser.name
            .charAt(0)
            .toUpperCase();

    document
        .getElementById("profileQuizzes")
        .textContent =
        currentUser.quizzesPlayed || 0;

    document
        .getElementById("profileBest")
        .textContent =
        currentUser.bestScore || 0;

    document
        .getElementById("profileCoins")
        .textContent =
        currentUser.coins || 0;

}


/* ================= SCORES ================= */

document
    .getElementById("scoresBtn")
    .addEventListener(
        "click",
        () => {

            loadScores();

            openModal(
                "scoresModal"
            );

        }
    );


function loadScores() {

    const list =
        document
            .getElementById(
                "scoresList"
            );

    if (
        !currentUser.scores ||
        currentUser.scores.length === 0
    ) {

        list.innerHTML =
            "<p>No quiz history yet.</p>";

        return;

    }


    list.innerHTML = "";


    [...currentUser.scores]
        .reverse()
        .forEach(
            result => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "admin-question";

                div.innerHTML = `

                    <strong>
                        ${result.category}
                    </strong>

                    <p>
                        Mode: ${result.mode}
                    </p>

                    <p>
                        Score: ${result.score}
                    </p>

                    <p>
                        Accuracy: ${result.percentage}%
                    </p>

                    <small>
                        ${result.date}
                    </small>

                `;

                list.appendChild(
                    div
                );

            }
        );

}


/* ================= MODALS ================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.remove(
            "hidden"
        );

}


document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.close;

                document
                    .getElementById(id)
                    .classList.add(
                        "hidden"
                    );

            }
        );

    });


/* ================= ADMIN ================= */

document
    .getElementById("adminBtn")
    .addEventListener(
        "click",
        openAdmin
    );


function openAdmin() {

    const admin =
        currentUser &&
        (
            currentUser.email ===
            "admin@quizmaster.com"
        );


    if (!admin) {

        alert(
            "Admin access is restricted."
        );

        return;

    }


    openModal(
        "adminModal"
    );

    loadAdminQuestions();

    loadAdminUsers();

}


/* ADMIN TABS */

document
    .querySelectorAll(".admin-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".admin-tab"
                    )
                    .forEach(
                        t =>
                            t.classList.remove(
                                "active"
                            )
                    );

                tab.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".admin-content"
                    )
                    .forEach(
                        content =>
                            content.classList.add(
                                "hidden"
                            )
                    );


                const target =
                    tab.dataset.adminTab;

                document
                    .getElementById(
                        "admin" +
                        target
                            .charAt(0)
                            .toUpperCase() +
                        target.slice(1)
                    )
                    .classList.remove(
                        "hidden"
                    );

            }
        );

    });


/* ADD QUESTION */

document
    .getElementById("addQuestionBtn")
    .addEventListener(
        "click",
        () => {

            const category =
                document
                    .getElementById(
                        "adminCategory"
                    )
                    .value;

            const question =
                document
                    .getElementById(
                        "adminQuestion"
                    )
                    .value
                    .trim();


            const options = [

                document
                    .getElementById(
                        "adminOption1"
                    )
                    .value
                    .trim(),

                document
                    .getElementById(
                        "adminOption2"
                    )
                    .value
                    .trim(),

                document
                    .getElementById(
                        "adminOption3"
                    )
                    .value
                    .trim(),

                document
                    .getElementById(
                        "adminOption4"
                    )
                    .value
                    .trim()

            ];


            const answer =
                Number(
                    document
                        .getElementById(
                            "adminCorrect"
                        )
                        .value
                );


            if (
                !question ||
                options.some(
                    o => !o
                )
            ) {

                alert(
                    "Please complete all fields."
                );

                return;

            }


            customQuestions.push({

                id:
                    Date.now(),

                category,

                question,

                options,

                answer

            });


            saveCustomQuestions();


            alert(
                "Question added successfully."
            );


            document
                .getElementById(
                    "adminQuestion"
                )
                .value = "";

            document
                .querySelectorAll(
                    ".admin-options input"
                )
                .forEach(
                    input =>
                        input.value = ""
                );


            loadAdminQuestions();

        }
    );


/* ADMIN QUESTION LIST */

function loadAdminQuestions() {

    const list =
        document
            .getElementById(
                "adminQuestionList"
            );

    if (
        customQuestions.length === 0
    ) {

        list.textContent =
            "No custom questions added.";

        return;

    }


    list.innerHTML = "";


    customQuestions.forEach(
        q => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-question";


            div.innerHTML = `

                <strong>
                    ${q.category}
                </strong>

                <p>
                    ${q.question}
                </p>

                <button
                    onclick="deleteQuestion(${q.id})">
                    Delete
                </button>

            `;


            list.appendChild(
                div
            );

        }
    );

}


function deleteQuestion(id) {

    customQuestions =
        customQuestions.filter(
            q => q.id !== id
        );

    saveCustomQuestions();

    loadAdminQuestions();

}


/* ADMIN USERS */

function loadAdminUsers() {

    const list =
        document
            .getElementById(
                "adminUserList"
            );


    list.innerHTML = "";


    users.forEach(
        user => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-question";

            div.innerHTML = `

                <strong>
                    ${user.name}
                </strong>

                <p>
                    ${user.email}
                </p>

                <p>
                    Quizzes:
                    ${user.quizzesPlayed || 0}
                </p>

                <p>
                    Best Score:
                    ${user.bestScore || 0}
                </p>

            `;


            list.appendChild(
                div
            );

        }
    );

}


/* ================= SAVE USER ================= */

function saveUser() {

    if (!currentUser) return;


    const index =
        users.findIndex(
            user =>
                user.id ===
                currentUser.id
        );


    if (index !== -1) {

        users[index] =
            currentUser;

    }


    saveUsers();

    saveCurrentUser();

}


/* ================= SHARE RESULT ================= */

document
    .getElementById("shareResult")
    .addEventListener(
        "click",
        async () => {

            const text =
                `I scored ${score} points in Quiz Master ${currentCategory} quiz with ${Math.round((correctCount / quizQuestions.length) * 100)}% accuracy.`;

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "Quiz Master Result",

                        text

                    });

                } catch (error) { }

            } else {

                await navigator.clipboard.writeText(
                    text
                );

                alert(
                    "Result copied to clipboard."
                );

            }

        }
    );


/* ================= QUICK ACTIONS ================= */

document
    .getElementById("continueQuiz")
    .addEventListener(
        "click",
        () => {

            startQuiz(
                currentCategory
            );

        }
    );


document
    .getElementById("viewLeaderboard")
    .addEventListener(
        "click",
        () => {

            alert(
                "Leaderboard feature is ready for backend integration."
            );

        }
    );


document
    .getElementById("shareProfile")
    .addEventListener(
        "click",
        async () => {

            const text =
                `${currentUser.name} is playing Quiz Master. Best Score: ${currentUser.bestScore || 0}`;

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "Quiz Master",

                        text

                    });

                } catch (error) { }

            } else {

                await navigator.clipboard.writeText(
                    text
                );

                alert(
                    "Profile information copied."
                );
            }
        }
    );


/* ================= 1V1 MODE ================= */

const originalStartQuiz =
    startQuiz;


function startBattle(category) {

    originalStartQuiz(category);

    setTimeout(() => {

        alert(
            "1v1 Battle started. You are playing against a virtual opponent."
        );

    }, 300);

}


document
    .querySelector(
        '[data-mode="battle"]'
    )
    .addEventListener(
        "click",
        () => {

            currentMode =
                "battle";

            startBattle(
                currentCategory
            );
        }
    );


/* ================= OFFLINE MODE ================= */

window.addEventListener(
    "offline",
    () => {

        alert(
            "You are offline. Quiz Master will continue using locally stored questions."
        );
    }
);


/* ================= HAPTIC ================= */

function vibrate() {

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(40);
    }
}


document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "option"
            )
        ) {

            vibrate();
        }
    }
);


/* ================= CREATE DEFAULT ADMIN ================= */

function createDefaultAdmin() {

    const exists =
        users.some(
            user =>
                user.email ===
                "admin@quizmaster.com"
        );


    if (!exists) {

        users.push({

            id: "admin",

            name: "Quiz Master Admin",

            email:
                "admin@quizmaster.com",

            password:
                "Admin@123",
            coins: 1000,
            lives: 999,
            streak: 0,
            bestScore: 0,
            quizzesPlayed: 0,
            scores: []

        });

        saveUsers();
    }
}
createDefaultAdmin();


/* ================= CLOSE MENU OUTSIDE ================= */

document.addEventListener(
    "click",
    event => {

        const menu =
            document.getElementById(
                "dropdownMenu"
            );

        const button =
            document.getElementById(
                "menuBtn"
            );

        if (
            !menu.contains(event.target) &&
            !button.contains(event.target)
        ) {

            menu.classList.add(
                "hidden"
            );

        }

    }
);