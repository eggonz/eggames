import type { GameConfig } from "./GameConfig"

export interface BingoConfig extends GameConfig {
  cols: number // columns for the grid
  rows: number // rows for the grid
  promptPool: string[] // list of available prompts
  selectedPrompts: string[] // list of selected prompts for the game
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}