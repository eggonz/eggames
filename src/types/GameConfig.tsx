// Game config interfaces

export class GameConfig {}

export interface BingoConfig extends GameConfig {
  cols: number // columns for the grid
  rows: number // rows for the grid
  promptPool: string[] // list of available prompts
  selectedPrompts: string[] // list of selected prompts for the game
}

export interface DummyConfig extends GameConfig {
  difficulty: number // 1-10
  spicyLevel: number // 0-2
  timeLimit: number // 15-120
  useGenAi: boolean
}

export interface WordGuessConfig extends GameConfig {
  difficulty: number // 1-10
}

// Game progress interfaces

export class GameProgress {}

export interface BingoProgress extends GameProgress {
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}

export interface DummyProgress extends GameProgress {
  counter: number
}

export interface WordGuessProgress extends GameProgress {
  // Add any specific progress properties for the Word Guess game here
}