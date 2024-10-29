import random

def get_user_input(prompt):
    """Function to get user input with the given prompt."""
    return input(prompt).strip().lower()

def combine_setting():
    """Function to generate a random place and time setting."""
    places = ["forest", "beach", "mountain", "city", "desert"]
    times = ["morning", "afternoon", "evening", "night"]
    return random.choice(places), random.choice(times)

def generate_genre():
    """Function to generate a random genre."""
    genres = ["fantasy", "sci-fi", "mystery", "romance", "horror"]
    return random.choice(genres)

def generate_story_type():
    """Function to generate a random story type."""
    story_types = ["short story", "novella", "screenplay", "poem"]
    return random.choice(story_types)

def generate_character_personality():
    """Function to generate a random character personality."""
    personalities = ["brave", "curious", "cunning", "kind", "intelligent"]
    return random.choice(personalities)

def main():
    """Main function to run the story generation process."""
    while True:
        start_prompt = get_user_input("Are you ready to start? (yes/no): ")
        if start_prompt == "yes":
            break  # Proceed to settings
        elif start_prompt == "no":
            continue  # Go back to start

    # Step 2: Combine setting
    setting_place, setting_time = combine_setting()
    print(f"Your setting: {setting_time} in the {setting_place}")

    if get_user_input("Do you like this setting? (yes/no): ") == "no":
        print("Regenerating setting...")
        setting_place, setting_time = combine_setting()
        print(f"New setting: {setting_time} in the {setting_place}")

    # Step 4: Generate genre
    story_genre = generate_genre()
    print(f"Generated genre: {story_genre}")

    if get_user_input("Do you like this genre? (yes/no): ") == "no":
        print("Regenerating genre...")
        story_genre = generate_genre()
        print(f"New genre: {story_genre}")

    # Step 6: Generate story type
    story_type = generate_story_type()
    print(f"Generated story type: {story_type}")

    if get_user_input("Do you like this story type? (yes/no): ") == "no":
        print("Regenerating story type...")
        story_type = generate_story_type()
        print(f"New story type: {story_type}")

    # Step 8: Generate main character personality
    character_personality = generate_character_personality()
    print(f"Generated character personality: {character_personality}")

    if get_user_input("Do you like this personality? (yes/no): ") == "no":
        print("Regenerating character personality...")
        character_personality = generate_character_personality()
        print(f"New character personality: {character_personality}")

    # Final decision to start writing
    if get_user_input("Are you ready to start writing? (yes/no): ") == "no":
        print("Restarting...")
        main()  # Restart the process
    else:
        print("Starting to write your story!")
        print(f"Setting: {setting_time} in the {setting_place}, Genre: {story_genre}, Story Type: {story_type}, Character Personality: {character_personality}")

if __name__ == "__main__":
    main()
