import type { GameConfig } from "./GameConfig"

export interface WordGuessConfig extends GameConfig {
  difficulty: number // 1-10
}

export const DEFAULT_WORD_GUESS_CONFIG: WordGuessConfig = {
  configured: false,
  difficulty: 5,
}