import React, { useEffect, useState } from "react"
import { FaShuffle } from "react-icons/fa6"
import Select, { type SingleValue } from "react-select"
import { BINGO_PACKAGES } from "../../../data/bingoPackages"
import { type BingoConfig } from "../../../types/BingoConfig"
import MainUiButton from "../../MainUiButton"
import styles from './BingoSettings.module.css'

// Types
type Option = { value: string; label: string; prompts: string[] }

// Constants
const MIN_COLS = 1
const MAX_COLS = 6
const MIN_ROWS = 1
const MAX_ROWS = 20

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
    const selectedPrompts = [...config.promptPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.cols * config.rows);
    setConfig(prev => ({
      ...prev,
      selectedPrompts: selectedPrompts,
      checkedPrompts: new Array(config.cols * config.rows).fill(false),
      configured: true,
    }))
  }

  useEffect(() => {
    const isConfiguredOk: boolean = config.selectedPrompts.length === config.cols * config.rows // TODO improve "configured" checks
    setConfig(prev => ({
      ...prev,
      configured: isConfiguredOk,
    }))
  }, [config.rows, config.cols, config.selectedPrompts.length, setConfig])

  const [textareaValue, setTextareaValue] = useState<string>(config.promptPool.join('\n'))
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      promptPool: textareaValue.split('\n').filter(prompt => prompt.trim() !== ''),
    }))
  }, [textareaValue, setConfig])

  const [savedUserPrompts, setSavedUserPrompts] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectChange = (
    newValue: SingleValue<Option>
  ) => {
    console.log('Triggered handleSelectChange')
    console.log('prevValue', selectedOption)
    console.log('newValue', newValue)
    if (!selectedOption && !newValue) {
      throw new Error('selectedOption and newValue are both null')
    } else if (!selectedOption) {
      newValue = newValue as Option
      // no package -> select package
      setIsLoading(true)
      setSavedUserPrompts(textareaValue.split('\n').filter(prompt => prompt.trim() !== ''))
      setSelectedOption(newValue)
      setTextareaValue(newValue.prompts.join('\n'))
      setConfig(prev => ({
        ...prev,
        promptPool: newValue?.prompts || [],
        selectedPrompts: [],
        checkedPrompts: [],
      }))
      setIsLoading(false)
    } else if (!newValue) {
      // selected package -> no package
      setIsLoading(true)
      setSelectedOption(newValue)
      setTextareaValue(savedUserPrompts.join('\n'))
      setConfig(prev => ({
        ...prev,
        promptPool: savedUserPrompts,
        selectedPrompts: [],
        checkedPrompts: [],
      }))
      setIsLoading(false)
    } else {
      // selected package -> select another package
      setIsLoading(true)
      setSelectedOption(newValue)
      setTextareaValue(newValue.prompts.join('\n'))
      setIsLoading(false)
    }
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
            min={MIN_COLS}
            max={MAX_COLS}
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
            min={MIN_ROWS}
            max={MAX_ROWS}
            value={config.rows}
            onChange={(e) => setConfig(prev => ({...prev, rows: parseInt(e.target.value)}))}
          />
        </div>
      </div>

      <div className={styles.promptPoolContainer}>
        <div className={styles.promptPoolHeader}>
          <label htmlFor="prompts">Prompt pool</label>
          <Select
            className={styles.select}
            // classNamePrefix="select"
            defaultValue={selectedOption}
            isLoading={isLoading}
            isClearable={true}
            name="color"
            options={BINGO_PACKAGES}
            onChange={handleSelectChange}
            placeholder={"Load package..."}
          />
        </div>
        <textarea
          id="prompts"
          name="prompts"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </div>

      <div className={styles.generateBtnContainer}>
        <MainUiButton
          Icon={FaShuffle}
          text={"Select random prompts"}
          onClick={handleButtonClick}
        />
      </div>

      {config.selectedPrompts.length > 0 && (
        <div className={styles.selectedPromptsContainer}>
          <label htmlFor="selectedPrompts">Selected prompts</label>
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