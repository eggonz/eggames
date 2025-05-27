import type { Game } from "../types/Game";

export const GAME_DATA: Game[] = [
  {
    id: "bingo",
    name: "Bingo",
    description: "Custom word bingo with your own prompts",
  },
  {
    id: "word-guess",
    name: "Word Guess",
    description: "Random word generator for pictionary/charades games",
    minPeople: 2,
    peopleLabel: "2+",
    timeLabel: "60 min"
  },
  {
    id: "dummy",
    name: "Dummy Game",
    description: "This is a dummy game for testing purposes",
    minPeople: 2,
    peopleLabel: "2-20",
    timeLabel: "30 min",
    ageLabel: "5+"
  },
]

export function getGameById(id: string): Game | undefined {
  return GAME_DATA.find(game => game.id === id)
}