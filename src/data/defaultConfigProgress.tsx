import type { BingoConfig, DummyConfig, GameConfig, WordGuessConfig } from "../types/GameConfig"
import type { BingoProgress, DummyProgress, GameProgress, WordGuessProgress } from "../types/GameProgress"

const DEFAULT_BINGO_CONFIG: BingoConfig = {
  cols: 4,
  rows: 6,
  promptPool: [],
  selectedPrompts: []
}

const DEFAULT_BINGO_PROGRESS: BingoProgress = {
  checkedPrompts: []
}

const DEFAULT_DUMMY_CONFIG: DummyConfig = {
  difficulty: 5,
  spicyLevel: 0,
  timeLimit: 30,
  useGenAi: false
}

const DEFAULT_DUMMY_PROGRESS: DummyProgress = {
  counter: 0,
}

const DEFAULT_WORD_GUESS_CONFIG: WordGuessConfig = {
  difficulty: 5,
}

const DEFAULT_WORD_GUESS_PROGRESS: WordGuessProgress = {
}

// Getters

function getDefaultConfig<T = GameConfig>(gameId: string): T {
  switch (gameId) {
    case 'bingo':
      return DEFAULT_BINGO_CONFIG as T
    case 'dummy':
      return DEFAULT_DUMMY_CONFIG as T
    case 'word-guess':
      return DEFAULT_WORD_GUESS_CONFIG as T
    default:
      // throw new Error(`Unknown game type: ${gameType}`)
      return {} as T
  }
}

function getDefaultProgress<T = GameProgress>(gameId: string): T {
  switch (gameId) {
    case 'bingo':
      return DEFAULT_BINGO_PROGRESS as T
    case 'dummy':
      return DEFAULT_DUMMY_PROGRESS as T
    case 'word-guess':
      return DEFAULT_WORD_GUESS_PROGRESS as T
    default:
      // throw new Error(`Unknown game type: ${gameType}`)
      return {} as T
  }
}

export { getDefaultConfig, getDefaultProgress }