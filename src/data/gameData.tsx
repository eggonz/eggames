import type { Game } from "../types/Game";

export const GAME_DATA: Game[] = [
  {
    id: "bingo",
    name: "Bingo",
    description: "Custom word bingo with your own prompts",
    people: "2+"
  },
  {
    id: "word-guess",
    name: "Word Guess",
    description: "Random word generator for pictionary/charades gameComponents",
    people: "4+",
    time: "60 min"
  },
  {
    id: "dummy",
    name: "Dummy Game",
    description: "Dummy description",
    people: "2+",
    time: "30 min",
    age: "5+"
  },
  // {
  //   id: "truth-or-dare",
  //   name: "TODO Truth or Dare",
  //   description: "Classic party game",
  //   people: "3+",
  //   age: "18+"
  // }
]

export function getGameById(id: string): Game | undefined {
  return GAME_DATA.find(game => game.id === id)
}