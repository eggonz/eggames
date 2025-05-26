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
    description: "Random word generator for pictionary/charades gameComponents",
    minPeople: 2,
    peopleLabel: "2+",
    timeLabel: "60 min"
  },
  {
    id: "dummy",
    name: "Dummy Game",
    description: "Dummy description",
    peopleLabel: "2+",
    timeLabel: "30 min",
    ageLabel: "5+"
  },
  // {
  //   id: "truth-or-dare",
  //   name: "TODO Truth or Dare",
  //   description: "Classic party game",
  //   peopleLabel: "3+",
  //   ageLabel: "18+"
  // }
]

export function getGameById(id: string): Game | undefined {
  return GAME_DATA.find(game => game.id === id)
}