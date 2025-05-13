/**
 * @typedef {Object} Game
 * @property {number} id - Unique identifier for the game
 * @property {string} name - Name of the game
 * @property {string} description - Short description of the game
 */

/** @type {Game[]} */
export const AVAILABLE_GAMES = [
  { id: 1, name: "Tic Tac Toe", description: "Classic X's and O's game" },
  { id: 2, name: "Memory Match", description: "Test your memory skills" },
  { id: 3, name: "Snake", description: "Classic snake game" },
  { id: 4, name: "Puzzle", description: "Sliding puzzle challenge" },
  { id: 5, name: "Word Hunt", description: "Find hidden words" },
  { id: 6, name: "Chess", description: "Strategic board game" }
];