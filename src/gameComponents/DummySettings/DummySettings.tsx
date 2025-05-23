import React, { useEffect } from "react"
import type { DummyConfig } from "../../types/GameConfig"
import CounterInput from "../../components/CounterInput"
import SelectBlocksInput from "../../components/SelectBlocksInput"
import SliderInput from "../../components/SliderInput"
import ToggleInput from "../../components/ToogleInput"
import styles from './DummySettings.module.css'

// Constants
const DIFFICULTY_MIN = 0
const DIFFICULTY_MAX = 100
const TIME_LIMIT_MIN = 15
const TIME_LIMIT_MAX = 120
const TIME_LIMIT_STEP = 15
const SPICY_OPTIONS = {
  MILD: { value: 0, label: 'Mild' },
  MEDIUM: { value: 1, label: 'Medium' },
  HOT: { value: 2, label: 'Hot' }
}

// Main Component
interface SettingsProps {
  config: DummyConfig
  setConfig: React.Dispatch<React.SetStateAction<DummyConfig>>
  setConfigured: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DummySettings({ config, setConfig, setConfigured }: SettingsProps) {

  useEffect(() => {
    // On config change, check if criteria are met
    const isConfiguredOk: boolean = (
      config.difficulty >= 50 &&
      config.spicyLevel >= SPICY_OPTIONS.MEDIUM.value
    )
    setConfigured(isConfiguredOk)
  }, [config.difficulty, config.spicyLevel, setConfigured])

  // Render

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      difficulty: parseInt(event.target.value)
    }))
  }

  const handleSelectBlockClick = (value: number) => {
    setConfig(prev => ({
      ...prev,
      spicyLevel: value
    }))
  }

  const handleTimeLimitChange = (direction: -1 | 1) => {
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
        <SliderInput value={config.difficulty}
                     min={DIFFICULTY_MIN}
                     max={DIFFICULTY_MAX}
                     step={1}
                     onChange={handleSliderChange} />
      </div>

      <div className={styles.settingsItem}>
        <label htmlFor="spicyLevel">Spicy Level</label>
        <SelectBlocksInput value={config.spicyLevel}
                           options={SPICY_OPTIONS}
                           onClick={handleSelectBlockClick} />
      </div>

      <div className={styles.settingsItem}>
        <label htmlFor="timeLimit">Time Limit</label>
        <CounterInput label={`${config.timeLimit}s`}
                      labelLeft={`-${TIME_LIMIT_STEP}s`}
                      labelRight={`+${TIME_LIMIT_STEP}s`}
                      value={config.timeLimit}
                      min={TIME_LIMIT_MIN}
                      max={TIME_LIMIT_MAX}
                      onClick={handleTimeLimitChange} />
      </div>

      <div className={[styles.settingsItem, styles.sideToggleItem].join(' ')}>
        <label>Use AI Generation</label>
        <ToggleInput isChecked={config.useGenAi}
                     onChange={handleToggleChange} />
      </div>
    </form>
  )
}