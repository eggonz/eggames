import type { WordGuessView } from "../constants/WordGuessView"

class GameProgress {}

interface BingoProgress extends GameProgress {
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}

interface DummyProgress extends GameProgress {
  counter: number
}

interface WordGuessProgress extends GameProgress {
  scores: { [teamIdx: number]: number } // team ID to score mapping
  lastPlayerPerTeam: { [teamIdx: number]: number } // last player's index for each team
  secret: string | null
  teamIdx: number  // 0-indexed
  skipsLeft: number
  view: WordGuessView
  roundWinnerTeamIdx: number | null  // 0-indexed
  timer: number
  timerRunning: boolean
}

export type { GameProgress, BingoProgress, DummyProgress, WordGuessProgress }