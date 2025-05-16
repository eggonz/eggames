import React, { useState } from "react"
import type { WordGuessConfig } from "../../../types/WordGuessConfig"
import styles from './WordGuessSettings.module.css'

// Interfaces
interface SettingsProps {
  config: WordGuessConfig
  setConfig: React.Dispatch<React.SetStateAction<WordGuessConfig>>
}

// Main Component
export default function WordGuessSettings({ config, setConfig }: SettingsProps) {
  const [sliderValue, setSliderValue] = useState<number>(config.difficulty)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value))
    setConfig((prevConfig) => ({
      ...prevConfig,
      difficulty: parseInt(event.target.value)
    }))
  }

  return (
    <div className="settings">
      <form className={styles.settingsForm}>
        <div className={styles.settingsItem}>
          <label htmlFor="difficulty">Difficulty Level</label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              id="difficulty"
              name="difficulty"
              min={1}
              max={10}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      </form>
      <span>{sliderValue}</span>
    </div>
  )
}