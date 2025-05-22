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

function getDefaultConfig(gameId: string): GameConfig {
  switch (gameId) {
    case 'bingo':
      return DEFAULT_BINGO_CONFIG
    case 'dummy':
      return DEFAULT_DUMMY_CONFIG
    case 'word-guess':
      return DEFAULT_WORD_GUESS_CONFIG
    default:
      console.log("Unknown game type at getDefaultConfig: " + gameId)
      return {}
  }
}

function getDefaultProgress(gameId: string): GameProgress {
  switch (gameId) {
    case 'bingo':
      return DEFAULT_BINGO_PROGRESS
    case 'dummy':
      return DEFAULT_DUMMY_PROGRESS
    case 'word-guess':
      return DEFAULT_WORD_GUESS_PROGRESS
    default:
      console.log("Unknown game type at getDefaultProgress: " + gameId)
      return {}
  }
}

export { getDefaultConfig, getDefaultProgress }