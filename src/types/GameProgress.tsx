import type { Player } from "./Player"
import type { Team } from "./Team"

class GameProgress {}

interface BingoProgress extends GameProgress {
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}

interface DummyProgress extends GameProgress {
  counter: number
}

interface WordGuessProgress extends GameProgress {
  scores: { [teamId: string]: number } // team ID to score mapping
  lastPlayerPerTeam: { [teamId: string]: number } // mapping to last player index
  currentTurn: { team: Team, player: Player } | null // current turn player. null if not started
}

export type { GameProgress, BingoProgress, DummyProgress, WordGuessProgress }