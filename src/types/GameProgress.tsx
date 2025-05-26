class GameProgress {}

interface BingoProgress extends GameProgress {
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}

interface DummyProgress extends GameProgress {
  counter: number
}

interface WordGuessProgress extends GameProgress {
  scores: { [teamIdx: number]: number } // team ID to score mapping
  secret: string | null
  teamIdx: number  // 0-indexed
  playerIdx: { [teamIdx: number]: number | null } // player's index for each team
  skipsLeft: number
  view: number
  roundWinnerTeamIdx: number | null  // 0-indexed
  timer: number
  timerRunning: boolean
}

export type { GameProgress, BingoProgress, DummyProgress, WordGuessProgress }