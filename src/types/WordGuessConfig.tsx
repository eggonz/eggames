import type { GameConfig } from "./GameConfig"

export interface WordGuessConfig extends GameConfig {
  difficulty: number // 1-10
}