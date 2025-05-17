import type { Game } from "../types/Game";

export const AVAILABLE_GAMES: Game[] = [
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    description: "Classic party game",
    people: "3+",
    age: "18+"
  },
  {
    id: "word-guess",
    name: "Word Guess",
    description: "Random word generator for pictionary/charades games",
    people: "4+",
    time: "30 min",
    age: "5+"
  },
  {
    id: "dummy",
    name: "Dummy Game",
    description: "Dummy description",
    people: "2+",
    time: "30 min",
    age: "5+"
  }
]

export function getGameById(id: string): Game | undefined {
  return AVAILABLE_GAMES.find(game => game.id === id)
}