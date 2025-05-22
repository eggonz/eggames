class GameProgress {}

interface BingoProgress extends GameProgress {
  checkedPrompts: boolean[] // list of checked prompts (for bingo)
}

interface DummyProgress extends GameProgress {
  counter: number
}

interface WordGuessProgress extends GameProgress {
  // Add any specific progress properties for the Word Guess game here
}

export type { GameProgress, BingoProgress, DummyProgress, WordGuessProgress }