import json

# Example function to generate flashcards
def generate_flashcards():
    flashcards = [
        {"question": "What is 2 + 2?", "answer": "4"},
        {"question": "What is the capital of France?", "answer": "Paris"},
        {"question": "What is the largest planet in our solar system?", "answer": "Jupiter"},
        {"question": "What is the smallest country in the world?", "answer": "Vatican City"}
    ]
    
    # Save flashcards to a JSON file
    with open("flashcards.json", "w") as file:
        json.dump(flashcards, file, indent=4)

# Generate flashcards
generate_flashcards()
