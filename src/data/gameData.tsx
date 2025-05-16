interface Game {
  id: string;         // Unique URL-friendly identifier for the game
  name: string;       // Name of the game
  description: string; // Short description of the game
  people: string;     // Recommended number of players
  time?: string;      // Optional: Estimated play time
  age?: string;       // Optional: Recommended minimum age
}

export const AVAILABLE_GAMES: Game[] = [
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    description: "Classic party game",
    people: "3+",
    age: "18+"
  }
]