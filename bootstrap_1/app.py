from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Sample data for flashcards, notes, and quizzes
flashcards = []  # List to store flashcards
notes = []       # List to store notes
quizzes = []     # List to store quiz questions

# Helper function: spaced repetition algorithm stub
def spaced_repetition(cards):
    """Stub function for spaced repetition calculation."""
    reviewed_cards = []
    for card in cards:
        # Example logic: if the card has been reviewed less than 3 times, schedule for review.
        if card.get("reviews", 0) < 3:
            reviewed_cards.append(card)
    return reviewed_cards

@app.route("/")
def index():
    return render_template("index.html")  # Ensure index.html is in templates/

@app.route("/signin", methods=["GET", "POST"])
def signin():
    if request.method == "POST":
        username = request.form.get("username")  # string
        password = request.form.get("password")  # string
        # Decision making: simple authentication stub
        if username == "admin" and password == "admin":
            return redirect(url_for("index"))
        else:
            return "Invalid credentials", 401
    return render_template("signin.html")

@app.route("/flashcards", methods=["GET", "POST"])
def flashcards_page():
    global flashcards
    if request.method == "POST":
        title = request.form.get("card-title")
        content = request.form.get("card-content")
        font_choice = request.form.get("font-choice")
        # Create flashcard using different data types
        new_card = {
            "title": title,
            "content": content,
            "font": font_choice,
            "reviews": 0  # int
        }
        flashcards.append(new_card)
    # Using decision structure and loop to prepare flashcards for review
    cards_for_review = spaced_repetition(flashcards)
    return render_template("flashcards.html", flashcards=flashcards, review_cards=cards_for_review)

@app.route("/notes", methods=["GET", "POST"])
def notes_page():
    global notes
    if request.method == "POST":
        note_content = request.form.get("note-content")
        # Save note; for simplicity, just store as string in a list.
        notes.append(note_content)
        return render_template("notes.html", notes=notes)

@app.route("/quiz", methods=["GET", "POST"])
def quiz_page():
    global quizzes
    if request.method == "POST":
        # Example: handle quiz submission
        question = request.form.get("question")
        answer = request.form.get("answer")
        quizzes.append({"question": question, "answer": answer})
    return render_template("quiz.html", quizzes=quizzes)

if __name__ == "__main__":
    # Descriptive variable names and data types in backend code:
    port_number = 5000  # integer
    debug_mode = True   # boolean
    app.run(port=port_number, debug=debug_mode)
