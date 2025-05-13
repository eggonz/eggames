/**
 * @typedef {Object} Game
 * @property {string} id - Unique URL-friendly identifier for the game
 * @property {string} name - Name of the game
 * @property {string} description - Short description of the game
 * @property {string} time - Estimated play time
 * @property {string} people - Recommended number of players
 * @property {string} age - Recommended minimum age
 */


/** @type {Game[]} */
export const AVAILABLE_GAMES = [
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    description: "Classic party game",
    people: "3+",
    age: "18+"
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Classic X's and O's game",
    time: "2 min",
    people: "2",
    age: "5+"
  },
  {
    id: "memory-match",
    name: "Memory Match",
    description: "Test your memory skills",
    time: "15 min",
    people: "1-4",
    age: "6+"
  },
  {
    id: "snake",
    name: "Snake",
    description: "Classic snake game",
    time: "10 min",
    people: "1",
    age: "8+"
  },
  {
    id: "puzzle",
    name: "Puzzle",
    description: "Sliding puzzle challenge",
    time: "20 min",
    people: "1",
    age: "10+"
  },
  {
    id: "word-hunt",
    name: "Word Hunt",
    description: "Find hidden words",
    time: "15 min",
    people: "1-6",
    age: "12+"
  },
  {
    id: "chess",
    name: "Chess",
    description: "Strategic board game",
    time: "20-30 min",
    people: "2",
    age: "8+"
  }
];