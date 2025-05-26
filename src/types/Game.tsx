export interface Game {
  id: string;     // Unique URL-friendly identifier for the game
  name: string;       // Name of the game
  description: string;// Short description of the game
  minPeople?: number;     // Minimum number of players required
  peopleLabel?: string;     // Recommended number of players
  timeLabel?: string;      // Optional: Estimated play time
  ageLabel?: string;       // Optional: Recommended minimum age
}