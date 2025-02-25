// Flashcards Data and Functions
const flashcardsData = JSON.parse(localStorage.getItem('flashcards')) || [];
const flashcardArea = document.getElementById('flashcardArea');
const createFlashcardButton = document.getElementById('createFlashcard');

// Login Section
const loginSection = document.getElementById('login');
const signupSection = document.getElementById('signup');
const appSection = document.getElementById('main');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');
const signupButton = document.getElementById('signupButton');
const backToLoginButton = document.getElementById('backToLogin');
const submitSignupButton = document.getElementById('submitSignup');
const signupError = document.getElementById('signupError');

// Predefined Users
const users = [
    { username: 'testuser', password: 'testpassword' },
    { username: 'admin', password: 'admin123' }
];

// Login functionality
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        loginSection.style.display = 'none';
        appSection.style.display = 'block';
    } else {
        // Failed login
        loginError.textContent = 'Invalid username or password. Please try again.';
    }
});

// Flashcard Creation Function
createFlashcardButton.addEventListener('click', () => {
    const flashcard = prompt("Enter a flashcard (question and answer, separated by a comma):");
    if (flashcard && flashcard.includes(',')) {
        const [question, answer] = flashcard.split(",");
        const flashcardObj = { question, answer, attempts: 0, correct: 0 };
        flashcardsData.push(flashcardObj);
        localStorage.setItem('flashcards', JSON.stringify(flashcardsData));
        loadFlashcards();
    } else {
        alert("Please enter a valid flashcard with a question and answer separated by a comma.");
    }
});

// Function to load and display flashcards with MCQ options
function loadFlashcards() {
    flashcardArea.innerHTML = '';
    flashcardsData.forEach((flashcard, index) => {
        const flashcardDiv = document.createElement('div');
        flashcardDiv.classList.add('flashcard');
        
        const { question, answer } = flashcard;

        // Creating a multiple-choice quiz from the flashcard
        const options = generateOptions(answer);

        flashcardDiv.innerHTML = `
            <strong>Question:</strong> ${question}<br>
            <ul>
                ${options.map(option => `<li>${option}</li>`).join('')}
            </ul>
            <button class="answerButton" data-index="${index}" data-answer="${answer}">Check Answer</button>
        `;

        flashcardArea.appendChild(flashcardDiv);
    });

    // Attach event listener for checking answer
    const answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const correctAnswer = e.target.getAttribute('data-answer');
            const userAnswer = prompt("Did you get it right? (Yes/No)").toLowerCase();

            // Check user input and update the flashcard's attempts and correctness count
            const flashcard = flashcardsData[index];
            flashcard.attempts += 1;

            if (userAnswer === 'yes') {
                flashcard.correct += 1;
                alert('Great job! You got it right.');
            } else {
                alert(`Oops! The correct answer is: ${correctAnswer}`);
            }

            localStorage.setItem('flashcards', JSON.stringify(flashcardsData));
            loadFlashcards();
        });
    });
}

// Generate multiple-choice options
function generateOptions(correctAnswer) {
    const fakeAnswers = ["Option A", "Option B", "Option C", "Option D"];
    const randomIndex = Math.floor(Math.random() * fakeAnswers.length);
    fakeAnswers[randomIndex] = correctAnswer;  // Replace a random option with the correct answer

    // Shuffle options for randomness
    return fakeAnswers.sort(() => Math.random() - 0.5);
}

// Sign-Up Section functionality
signupButton.addEventListener('click', () => {
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
});

backToLoginButton.addEventListener('click', () => {
    loginSection.style.display = 'block';
    signupSection.style.display = 'none';
});

submitSignupButton.addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const userExists = users.some(user => user.username === newUsername);
    if (userExists) {
        signupError.textContent = 'Username already exists. Please choose another.';
    } else {
        users.push({ username: newUsername, password: newPassword });
        alert('Sign-up successful! You can now log in.');
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    }
});

// Logout Function
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    loginSection.style.display = 'block';
    appSection.style.display = 'none';
});

// Dark Mode Functionality
const modeToggleButton = document.getElementById('modeToggle');
modeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Check if the user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    loginSection.style.display = 'none';
    appSection.style.display = 'block';
} else {
    loginSection.style.display = 'block';
    appSection.style.display = 'none';
}
