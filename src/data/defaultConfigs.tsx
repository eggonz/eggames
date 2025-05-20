import type { BingoConfig } from "../types/BingoConfig"
import type { DummyConfig } from "../types/DummyConfig"
import { DEFAULT_GAME_CONFIG, type GameConfig } from "../types/GameConfig"
import type { WordGuessConfig } from "../types/WordGuessConfig"

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
      return DEFAULT_GAME_CONFIG as T
  }
}

export const DEFAULT_BINGO_CONFIG: BingoConfig = {
  configured: false,
  cols: 4,
  rows: 6,
  selectedPrompts: [],
  checkedPrompts: [],
  promptPool: []
}

export const DEFAULT_DUMMY_CONFIG: DummyConfig = {
  configured: true,
  difficulty: 5,
  spicyLevel: 0,
  timeLimit: 30,
  useGenAi: false
}

export const DEFAULT_WORD_GUESS_CONFIG: WordGuessConfig = {
  configured: false,
  difficulty: 5,
}