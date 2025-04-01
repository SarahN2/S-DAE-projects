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
