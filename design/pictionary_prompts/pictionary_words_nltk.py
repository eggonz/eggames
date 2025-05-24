import random
import nltk
from nltk.corpus import words, names
from pathlib import Path

# Ensure required NLTK datasets are downloaded
nltk.download('words', quiet=True)
nltk.download('names', quiet=True)

# Word pool from NLTK
all_words = set(words.words())

# Filtered categories
easy_words = {w for w in all_words if len(w) <= 4 and w.isalpha()}
medium_words = {w for w in all_words if 5 <= len(w) <= 7 and w.isalpha()}
difficult_words = {w for w in all_words if 8 <= len(w) <= 10 and w.isalpha()}
very_difficult_words = {w for w in all_words if len(w) > 10 and w.isalpha()}

# Special categories
people = {name + " (person)" for name in names.words()}
movies = {
    "Inception (movie)", "Titanic (movie)", "The Matrix (movie)", "Interstellar (movie)",
    "The Godfather (movie)", "Forrest Gump (movie)", "Gladiator (movie)", "Jaws (movie)"
}
cities = {
    "New York (city)", "London (city)", "Paris (city)", "Tokyo (city)", "Berlin (city)",
    "Sydney (city)", "Cairo (city)", "Toronto (city)"
}
landmarks = {
    "Eiffel Tower (landmark)", "Statue of Liberty (landmark)", "Big Ben (landmark)",
    "Great Wall of China (landmark)", "Colosseum (landmark)", "Taj Mahal (landmark)"
}

special_category_words = list(people | movies | cities | landmarks)

# Shuffle for randomness
random.shuffle(special_category_words)

# Difficulty counts
TOTAL = 5000
easy_count = int(TOTAL * 0.10)
medium_count = int(TOTAL * 0.50)
difficult_count = int(TOTAL * 0.30)
very_difficult_count = int(TOTAL * 0.10)

def get_unique_words(source_set, count, used):
    result = []
    for word in source_set:
        if word not in used:
            result.append(word)
            used.add(word)
        if len(result) >= count:
            break
    return result

# Used tracker
used_words = set()

# Generate difficulty-based words
easy = get_unique_words(easy_words, easy_count, used_words)
medium = get_unique_words(medium_words, medium_count, used_words)
difficult = get_unique_words(difficult_words, difficult_count, used_words)
very_difficult = get_unique_words(very_difficult_words, very_difficult_count, used_words)

# Add special words until we reach 5000
core_list = easy + medium + difficult + very_difficult
while len(core_list) < TOTAL:
    candidate = special_category_words.pop()
    if candidate not in used_words:
        core_list.append(candidate)
        used_words.add(candidate)

# Shuffle the final list
random.shuffle(core_list)

# Write to file
output_file = Path("pictionary_words.txt")
with output_file.open("w", encoding="utf-8") as f:
    for word in core_list:
        f.write(word + "\n")

print(f"✅ Successfully generated {len(core_list)} words to {output_file}")

