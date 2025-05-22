import {
  type BingoConfig,
  type BingoProgress,
  type DummyConfig,
  type DummyProgress,
  type GameConfig,
  type GameProgress,
  type WordGuessConfig,
  type WordGuessProgress
} from "../types/GameConfig"

export function getDefaultConfig<T=GameConfig>(gameId: string): T {
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

export function getDefaultProgress<T=GameProgress>(gameId: string): T {
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

export const DEFAULT_BINGO_CONFIG: BingoConfig = {
  cols: 4,
  rows: 6,
  promptPool: [],
  selectedPrompts: []
}

export const DEFAULT_BINGO_PROGRESS: BingoProgress = {
  checkedPrompts: []
}

export const DEFAULT_DUMMY_CONFIG: DummyConfig = {
  difficulty: 5,
  spicyLevel: 0,
  timeLimit: 30,
  useGenAi: false
}

export const DEFAULT_DUMMY_PROGRESS: DummyProgress = {
  counter: 0,
}

export const DEFAULT_WORD_GUESS_CONFIG: WordGuessConfig = {
  difficulty: 5,
}

export const DEFAULT_WORD_GUESS_PROGRESS: WordGuessProgress = {
}