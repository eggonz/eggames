import type { Team } from "./Team"

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
  numTeams: number // number of teams
  turnDuration: number // in seconds
  pointsToWin: number // points to win
  allowInfiniteSkips: boolean // allow infinite skips
  teams: Team[] // generated teams for the game
}

export type { GameConfig, BingoConfig, DummyConfig, WordGuessConfig }