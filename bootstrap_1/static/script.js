// JavaScript for interactive elements and dark/light mode toggle

// Descriptive variable names with different data types:
let currentMode = document.documentElement.getAttribute('data-mode'); // string
let baseNumber = 10; // integer

// Mathematical operation: calculate doubled value.
let doubledValue = baseNumber * 2; // multiplication operation

// Log result to console:
console.log("Doubled Value:", doubledValue);

// Function to display output in DOM:
function displayOutput(message) {
  const outputDiv = document.createElement("div");
  outputDiv.textContent = message;
  outputDiv.style.padding = "10px";
  outputDiv.style.margin = "10px 0";
  outputDiv.style.border = "1px solid var(--accent-color)";
  document.body.prepend(outputDiv);
}

// Decision making with if-else and logical operator:
if (baseNumber > 5 && currentMode === "light") {
  displayOutput("The base number is greater than 5 and the site is in light mode.");
} else {
  displayOutput("Either the base number is not greater than 5 or the site is in dark mode.");
}

// Dark/Light Mode Toggle functionality:
document.getElementById("toggle-mode").addEventListener("click", function() {
  let htmlElement = document.documentElement;
  let currentTheme = htmlElement.getAttribute("data-mode");
  let newTheme = currentTheme === "light" ? "dark" : "light";
  htmlElement.setAttribute("data-mode", newTheme);
  // Also update header data-theme attribute for consistency
  document.getElementById("site-header").setAttribute("data-theme", newTheme);
  displayOutput("Switched to " + newTheme + " mode.");
});

// Flashcards functionality (for flashcards.html):
if (document.getElementById("flashcard-form")) {
  const flashcardForm = document.getElementById("flashcard-form");
  const flashcardsDisplay = document.getElementById("flashcards-display");
  let flashcards = []; // collection (array) for flashcards

  // Custom function to render flashcards:
  function renderFlashcards() {
    flashcardsDisplay.innerHTML = "";
    flashcards.forEach(function(card, index) {
      // Create flashcard container
      const cardDiv = document.createElement("div");
      cardDiv.className = "flashcard";
      cardDiv.style.fontFamily = card.font;
      cardDiv.setAttribute("data-index", index);
      // Flashcard content
      cardDiv.innerHTML = `<h3>${card.title}</h3>
                           <p>${card.content}</p>
                           <button class="edit-card btn btn-sm btn-info" data-index="${index}">Edit</button>
                           <button class="delete-card btn btn-sm btn-danger" data-index="${index}">Delete</button>`;
      flashcardsDisplay.appendChild(cardDiv);
    });
  }

  // Event listener for form submission:
  flashcardForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const cardTitle = document.getElementById("card-title").value;
    const cardContent = document.getElementById("card-content").value;
    const fontChoice = document.getElementById("font-choice").value;
    
    // Create flashcard object using different data types
    let newFlashcard = {
      title: cardTitle,
      content: cardContent,
      font: fontChoice,
      createdAt: new Date()  // date type
    };
    flashcards.push(newFlashcard);
    renderFlashcards();
    flashcardForm.reset();
    displayOutput("Flashcard added successfully.");
  });

  // Event delegation for edit and delete buttons:
  flashcardsDisplay.addEventListener("click", function(e) {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("delete-card")) {
      flashcards.splice(index, 1);
      renderFlashcards();
      displayOutput("Flashcard deleted.");
    } else if (e.target.classList.contains("edit-card")) {
      // For simplicity, prompt for new content
      let newContent = prompt("Edit flashcard content:", flashcards[index].content);
      if (newContent !== null) {
        flashcards[index].content = newContent;
        renderFlashcards();
        displayOutput("Flashcard updated.");
      }
    }
  });
}
