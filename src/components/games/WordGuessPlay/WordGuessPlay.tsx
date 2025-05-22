import type { WordGuessConfig } from "../../../types/GameConfig"

// Main Component
export default function WordGuessPlay({ config }: { config: WordGuessConfig }) {
  return (
    <div>
      <h2>Word Guess Game</h2>
      <p>Guess the word based on the clues provided!</p>
      <h3>Current config</h3>
      {Object.entries(config).map(([key, value]) => (
        <p key={key}>
          {key}: {value.toString()}
        </p>
      ))}
    </div>
  )
}