import type { DummyConfig } from "../../../types/GameConfig"

// Main Component
export default function DummyPlay({ config }: { config: DummyConfig }) {
  return (
    <div>
      <h2>Dummy Game</h2>
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