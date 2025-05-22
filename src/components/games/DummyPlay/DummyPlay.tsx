import React from "react"
import type { DummyConfig } from "../../../types/GameConfig"
import type { DummyProgress } from "../../../types/GameProgress"
import styles from './DummyPlay.module.css'

// Main Component
interface PlayProps {
  config: DummyConfig
  progress: DummyProgress
  setProgress: React.Dispatch<React.SetStateAction<DummyProgress>>
}

export default function DummyPlay({ config, progress, setProgress }: PlayProps) {

  const handleCounterUp = () => {
    setProgress((prev: DummyProgress) => ({
      ...prev,
      counter: prev.counter + 1
    }))
  }

  const handleCounterDown = () => {
    setProgress((prev: DummyProgress) => ({
      ...prev,
      counter: prev.counter - 1
    }))
  }

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
      <h3>Current progress</h3>
      <div className={styles.progressCounterContainer}>
        <button onClick={handleCounterDown}>-1</button>
        <span>{progress.counter}</span>
        <button onClick={handleCounterUp}>+1</button>
      </div>
    </div>
  )
}