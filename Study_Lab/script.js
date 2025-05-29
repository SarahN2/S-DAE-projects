// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9WsU3zPb09kIwHScxJglZUaw3IgSN6TU",
  authDomain: "study-976a5.firebaseapp.com",
  projectId: "study-976a5",
  storageBucket: "study-976a5.firebasestorage.app",
  messagingSenderId: "355390907058",
  appId: "1:355390907058:web:063c2518c16d23ae9b5fab",
  measurementId: "G-B4HNS5TFWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Example JavaScript to handle flashcard creation
let flashcards = [];

function createFlashcard() {
    const front = prompt("Enter the front text of the flashcard:");
    const back = prompt("Enter the back text of the flashcard:");

    if (front && back) {
        flashcards.push({ front, back });
        displayFlashcards();
    }
}

function displayFlashcards() {
    const container = document.getElementById("flashcard-container");
    container.innerHTML = "";

    flashcards.forEach((flashcard, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("flashcard");

        const front = document.createElement("p");
        front.textContent = `Front: ${flashcard.front}`;
        cardDiv.appendChild(front);

        const back = document.createElement("p");
        back.textContent = `Back: ${flashcard.back}`;
        cardDiv.appendChild(back);

        container.appendChild(cardDiv);
    });
}

// Function to handle notes saving (example)
function saveNotes() {
    const notes = document.getElementById("notesArea").value;
    localStorage.setItem("notes", notes);
    alert("Notes saved!");
}
