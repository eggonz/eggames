import type { BingoConfig, DummyConfig, GameConfig, WordGuessConfig } from "../types/GameConfig"
import type { BingoProgress, DummyProgress, GameProgress, WordGuessProgress } from "../types/GameProgress"
import { WordGuessView } from "./WordGuessView"

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
  numTeams: 2, // +-1, 2-4
  turnDuration: 60, // +-15, 15-120
  pointsToWin: 20, // +-5, 5-50
  allowInfiniteSkips: true,
  teams: [], // generate teams on settings page
}

const default_word_guess_progress = (config: WordGuessConfig): WordGuessProgress => ({
  scores: config.teams.map(() => 0),
  lastPlayerPerTeam: config.teams.map(() => -1),
  secret: null,
  teamIdx: -1,
  skipsLeft: 0,
  view: WordGuessView.NEXT,
  roundWinnerTeamIdx: null,
  timer: 0,
  timerRunning: false,
})

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

function getDefaultProgress(gameId: string, config: GameConfig): GameProgress {
  switch (gameId) {
    case 'bingo':
      return DEFAULT_BINGO_PROGRESS
    case 'dummy':
      return DEFAULT_DUMMY_PROGRESS
    case 'word-guess':
      return default_word_guess_progress(config as WordGuessConfig)
    default:
      console.log("Unknown game type at getDefaultProgress: " + gameId)
      return {}
  }
}

export { getDefaultConfig, getDefaultProgress }