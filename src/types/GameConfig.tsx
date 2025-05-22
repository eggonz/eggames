class GameConfig {}

interface BingoConfig extends GameConfig {
  cols: number // columns for the grid
  rows: number // rows for the grid
  promptPool: string[] // list of available prompts
  selectedPrompts: string[] // list of selected prompts for the game
}

interface DummyConfig extends GameConfig {
  difficulty: number // 1-10
  spicyLevel: number // 0-2
  timeLimit: number // 15-120
  useGenAi: boolean
}

interface WordGuessConfig extends GameConfig {
  difficulty: number // 1-10
}

export type { GameConfig, BingoConfig, DummyConfig, WordGuessConfig }