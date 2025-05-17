import React from "react"
import { FaShuffle } from "react-icons/fa6"
import { type BingoConfig } from "../../../types/BingoConfig"
import PrimaryButton from "../../PrimaryButton"
import styles from './BingoSettings.module.css'

// Interfaces
interface SettingsProps {
  config: BingoConfig
  setConfig: React.Dispatch<React.SetStateAction<BingoConfig>>
}

// Main Component
export default function BingoSettings({ config, setConfig }: SettingsProps) {

  const handleButtonClick = () => {
    if (config.promptPool.length === 0) {
      alert("Please add prompts to the prompt pool before randomizing.")
      return
    }
    if (config.selectedPrompts.length > 0) {
      const confirmOverwrite = window.confirm("Are you sure you want to overwrite the current prompt selection?")
      if (!confirmOverwrite) return
    }
    if (config.checkedPrompts.length > 0) {
      const confirmOverwrite = window.confirm("Are you sure you want to lose your progress and start again?")
      if (!confirmOverwrite) return
    }
    const selectedPrompts = [...config.promptPool] /* TODO if cols/rows change, it is not configured anymore */
      .sort(() => Math.random() - 0.5)
      .slice(0, config.cols * config.rows);
    setConfig(prev => ({
      ...prev,
      selectedPrompts: selectedPrompts,
      checkedPrompts: []
    }))
  }

  return (
    <form className={styles.settingsForm}>
      <div className={styles.rowAndColContainer}>
        <div className={styles.rowOrColContainer}>
          <label htmlFor="cols">Cols</label>
          <input
            type="number"
            id="cols"
            name="cols"
            min={1}
            max={10}
            value={config.cols}
            onChange={(e) => setConfig(prev => ({...prev, cols: parseInt(e.target.value)}))}
          />
        </div>

        <div className={styles.rowOrColContainer}>
          <label htmlFor="rows">Rows</label>
          <input
            type="number"
            id="rows"
            name="rows"
            min={1}
            max={10}
            value={config.rows}
            onChange={(e) => setConfig(prev => ({...prev, rows: parseInt(e.target.value)}))}
          />
        </div>
      </div>

      {/* TODO list of prompts similar to players list */}
      <div className={styles.promptPoolContainer}>
        <label htmlFor="prompts">Prompts</label>
        <textarea
          id="prompts"
          name="prompts"
          value={config.promptPool.join('\n')}
          onChange={(e) => setConfig(prev => ({ ...prev, promptPool: e.target.value.split('\n') }))}
        />
      </div>

      <div className={styles.btnContainer}>
        <PrimaryButton
          Icon={FaShuffle}
          text={"Generate"}
          onClick={handleButtonClick}
        />
      </div>

      {config.selectedPrompts.length > 0 && (
        <div className={styles.selectedPromptsContainer}>
          <label htmlFor="selectedPrompts">Selected Prompts</label>
          <ol className={styles.selectedPromptsList}>
            {config.selectedPrompts.map((prompt, index) => (
              <li key={index} className={styles.selectedPromptItem}>
                {prompt}
              </li>
            ))}
          </ol>
        </div>
      )}
    </form>
  )
}