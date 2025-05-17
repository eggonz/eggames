export interface WordGuessConfig {
  difficulty: number // 1-10
}

export const DEFAULT_WORD_GUESS_CONFIG: WordGuessConfig = {
  difficulty: 5,
}