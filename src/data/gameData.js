/**
 * @typedef {Object} Game
 * @property {string} id - Unique URL-friendly identifier for the game
 * @property {string} name - Name of the game
 * @property {string} description - Short description of the game
 * @property {string} people - Recommended number of players
 * @property {string} [time] - Estimated play time
 * @property {string} [age] - Recommended minimum age
 */


/** @type {Game[]} */
export const AVAILABLE_GAMES = [
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    description: "Classic party game",
    people: "3+",
    age: "18+"
  }
];