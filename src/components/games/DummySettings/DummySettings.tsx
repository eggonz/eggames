import React from "react"
import { type DummyConfig } from "../../../types/DummyConfig"
import styles from './DummySettings.module.css'

// Types
type Direction = -1 | 1;

// Constants
const DIFFICULTY_MIN = 0;
const DIFFICULTY_MAX = 100;
const TIME_LIMIT_MIN = 15;
const TIME_LIMIT_MAX = 120;
const TIME_LIMIT_STEP = 15;
const SpicyLevel = {
  MILD: 0,
  MEDIUM: 1,
  HOT: 2
}

// Interfaces
interface SettingsProps {
  config: DummyConfig
  setConfig: React.Dispatch<React.SetStateAction<DummyConfig>>
}

// Main Component
export default function DummySettings({ config, setConfig }: SettingsProps) {

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      difficulty: parseInt(event.target.value)
    }))
  }

  const handleTimeLimitChange = (direction: Direction) => {
    setConfig(prev => ({
      ...prev,
      timeLimit: Math.max(TIME_LIMIT_MIN, Math.min(TIME_LIMIT_MAX,
        prev.timeLimit + (direction * TIME_LIMIT_STEP)))
    }))
  }

  const handleToggleChange = () => {
    setConfig(prev => ({
      ...prev,
      useGenAi: !prev.useGenAi
    }))
  }

  return (
    <form className={styles.settingsForm}>
      <div className={styles.settingsItem}>
        <label htmlFor="difficulty">Difficulty Level</label>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            id="difficulty"
            name="difficulty"
            min={DIFFICULTY_MIN}
            max={DIFFICULTY_MAX}
            value={config.difficulty}
            onChange={handleSliderChange}
          />
          <span className={styles.sliderValue}>{config.difficulty}</span>
        </div>
      </div>

      <div className={styles.settingsItem}>
        <label htmlFor="spicyLevel">Spicy Level</label>
        <div className={styles.selectBlocks}>
          <button
            type="button"
            className={styles.selectBlock + ' ' + (config.spicyLevel === SpicyLevel.MILD ? styles.selected : '')}
            onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.MILD }))}
          >
            Mild
          </button>
          <button
            type="button"
            className={styles.selectBlock + ' ' + (config.spicyLevel === SpicyLevel.MEDIUM ? styles.selected : '')}
            onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.MEDIUM }))}
          >
            Medium
          </button>
          <button
            type="button"
            className={styles.selectBlock + ' ' + (config.spicyLevel === SpicyLevel.HOT ? styles.selected : '')}
            onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.HOT }))}
          >
            Hot
          </button>
        </div>
      </div>

      <div className={styles.settingsItem}>
        <label htmlFor="timeLimit">Time Limit</label>
        <div className={styles.timeLimitContainer}>
          <button
            type="button"
            onClick={() => handleTimeLimitChange(-1)}
            disabled={config.timeLimit <= TIME_LIMIT_MIN}
            className={styles.timeButton}
          >
            -{TIME_LIMIT_STEP}s
          </button>
          <span className="time-display">{config.timeLimit}s</span>
          <button
            type="button"
            onClick={() => handleTimeLimitChange(1)}
            disabled={config.timeLimit >= TIME_LIMIT_MAX}
            className={styles.timeButton}
          >
            +{TIME_LIMIT_STEP}s
          </button>
        </div>
      </div>

      <div className={[styles.settingsItem, styles.sideToggleItem].join(' ')}>
        <label>Use AI Generation</label>
        <div className={styles.toggleSwitch}>
          <input
            type="checkbox"
            id="useGenAi"
            name="useGenAi"
            checked={config.useGenAi}
            onChange={handleToggleChange}
            className={styles.toggleInput}
          />
          <label className={styles.toggleLabel} htmlFor="useGenAi">
            <span className={styles.toggleButton}></span>
          </label>
        </div>
      </div>
    </form>
  )
}