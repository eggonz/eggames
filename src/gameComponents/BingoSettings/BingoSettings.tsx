import React, { useEffect, useState } from "react"
import { FaShareAlt, FaTimes } from "react-icons/fa"
import { FaQrcode, FaShuffle } from "react-icons/fa6"
// @ts-expect-error Qr scanner is a third-party library that may not have types
import QrScanner from "react-qr-scanner"
import Select, { type SingleValue } from "react-select"
import MainUiButton from "../../components/MainUiButton"
import { BINGO_PACKAGES } from "../../data/bingoPackages"
import type { BingoConfig } from "../../types/GameConfig"
import { compressData, decompressData } from "../../utils/dataCompressor"
import styles from './BingoSettings.module.css'

// Types
type Option = { value: string; label: string; prompts: string[] }

// Constants
const MIN_COLS = 1
const MAX_COLS = 6
const MIN_ROWS = 1
const MAX_ROWS = 20
const QR_SIZE = 600

// Main Component
interface SettingsProps {
  config: BingoConfig
  setConfig: React.Dispatch<React.SetStateAction<BingoConfig>>
  setConfigured: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BingoSettings({ config, setConfig, setConfigured }: SettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [savedUserPrompts, setSavedUserPrompts] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null)
  const [textareaValue, setTextareaValue] = useState<string>(config.promptPool.join('\n'))
  const [showQrDisplay, setShowQrDisplay] = useState(false)
  const [qrUrl, setQrUrl] = useState('')
  const [showScanner, setShowScanner] = useState(false)


  useEffect(() => {
    // On config change, check if criteria are met
    const isConfiguredOk: boolean = config.selectedPrompts.length === config.cols * config.rows
    setConfigured(isConfiguredOk)
  }, [config.rows, config.cols, config.selectedPrompts.length, setConfigured])

  // Render

  const handleSelectChange = (
    newValue: SingleValue<Option>
  ) => {
    if (!selectedOption && !newValue) {
      throw new Error('selectedOption and newValue are both null')
    } else if (!selectedOption && !!newValue) {
      // no package -> select package
      setIsLoading(true)
      setSavedUserPrompts(textareaValue.split('\n').filter(prompt => prompt.trim() !== ''))
      setSelectedOption(newValue)
      setTextareaValue(newValue.prompts.join('\n'))
      setConfig((prev: BingoConfig) => ({
        ...prev,
        promptPool: newValue.prompts || [],
        selectedPrompts: [],
      }))
      setIsLoading(false)
    } else if (!newValue) {
      // selected package -> no package
      setIsLoading(true)
      setSelectedOption(newValue)
      setTextareaValue(savedUserPrompts.join('\n'))
      setConfig((prev: BingoConfig) => ({
        ...prev,
        promptPool: savedUserPrompts,
        selectedPrompts: [],
      }))
      setIsLoading(false)
    } else {
      // selected package -> select another package
      setIsLoading(true)
      setSelectedOption(newValue)
      setTextareaValue(newValue.prompts.join('\n'))
      setConfig((prev: BingoConfig) => ({
        ...prev,
        promptPool: newValue.prompts || [],
        selectedPrompts: [],
      }))
      setIsLoading(false)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTextareaValue(value)
    setConfig((prev: BingoConfig) => ({
      ...prev,
      promptPool: value.split('\n').filter(prompt => prompt.trim() !== ''),
    }))
  }

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setConfig((prev: BingoConfig) => ({
      ...prev,
      cols: value,
      selectedPrompts: [],
    }))
  }

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setConfig((prev: BingoConfig) => ({
      ...prev,
      rows: value,
      selectedPrompts: [],
    }))
  }

  const handleQrShareClick = () => {
    if (textareaValue.trim() === "") {
      alert("Please add prompts to the prompt pool before sharing.")
      return
    }
    const qrData = {
      cols: config.cols,
      rows: config.rows,
      promptPool: textareaValue.split('\n').filter(prompt => prompt.trim() !== ''),
    }
    const qrDataCompressed = compressData(JSON.stringify(qrData))
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrDataCompressed)}&size=${QR_SIZE}x${QR_SIZE}`
    setQrUrl(qrCodeUrl)
    setShowQrDisplay(true)
  }

  const handleQrScan = (data: string) => {
    try {
      const parsedData = JSON.parse(data)
      setConfig((prev) => ({
        ...prev,
        cols: parsedData.cols || prev.cols,
        rows: parsedData.rows || prev.rows,
        promptPool: parsedData.promptPool || prev.promptPool,
        selectedPrompts: []
      }))
      setTextareaValue(parsedData.promptPool.join('\n'))
      setSelectedOption(null) // Reset selected option
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      alert("Error parsing QR code data")
    }
  }

  const handleRandomizeButtonClick = () => {
    if (config.promptPool.length === 0) {
      alert("Please add prompts to the prompt pool before randomizing.")
      return
    }
    if (config.selectedPrompts.length > 0) {
      const confirmOverwrite = window.confirm("Are you sure you want to overwrite the current prompt selection?")
      if (!confirmOverwrite) return
    }
    const selectedPrompts = [...config.promptPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.cols * config.rows)
    setConfig((prev: BingoConfig) => ({
      ...prev,
      selectedPrompts: selectedPrompts,
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
            min={MIN_COLS}
            max={MAX_COLS}
            value={config.cols}
            onChange={handleColsChange}
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
            onChange={handleRowsChange}
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
          onChange={handleTextareaChange}
        />
      </div>

      <div className={styles.qrBtnContainer}>
        <MainUiButton
          Icon={FaShareAlt}
          text={"Share QR"}
          variant={"secondary"}
          disabled={textareaValue.trim() === ""}
          onClick={handleQrShareClick}
        />
        <MainUiButton
          Icon={FaQrcode}
          text={"Read QR"}
          variant={"secondary"}
          onClick={() => setShowScanner(true)}
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

      <div className={styles.generateBtnContainer}>
        <MainUiButton
          Icon={FaShuffle}
          text={"Select random prompts"}
          onClick={handleRandomizeButtonClick}
        />
      </div>

      {showQrDisplay && (
        <QrDisplayOverlay
          qrUrl={qrUrl}
          onClose={() => setShowQrDisplay(false)}
        />
      )}

      {showScanner && (
        <QrScannerOverlay
          onClose={() => setShowScanner(false)}
          onScan={handleQrScan}
        />
      )}
    </form>
  )
}

function QrDisplayOverlay({ qrUrl, onClose }: { qrUrl: string, onClose: () => void }) {
  return (
    <div className={styles.scannerOverlay}>
      <div className={styles.scannerContainer}>
        <MainUiButton
          Icon={FaTimes}
          variant={"secondary"}
          onClick={onClose}
          className={styles.closeButton}
        />
        <div className={styles.qrDisplayContainer}>
          <img src={qrUrl} alt="QR Code" />
        </div>
      </div>
    </div>
  )
}

function QrScannerOverlay({ onClose, onScan }: {
  onClose: () => void,
  onScan: (data: string) => void
}) {
  const handleError = (err: Error) => {
    console.error(err)
    alert("Error accessing camera. Please try again.")
    onClose()
  }

  const handleScan = (data: { text: string } | null) => {
    if (data) {
      try {
        const qrData = decompressData(data.text)
        const parsedData = JSON.parse(qrData)
        if (parsedData.promptPool && Array.isArray(parsedData.promptPool)) {
          // confirm with user before applying
          const confirmApply = window.confirm("Do you want to apply the scanned QR code data?\n\n" +
            `C:${parsedData.cols} R:${parsedData.rows}\nPrompts: ${parsedData.promptPool.join(';')}`)
          if (confirmApply) {
            onScan(qrData)
            onClose()
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        alert("Invalid QR code format")
      }
    }
  }

  return (
    <div className={styles.scannerOverlay}>
      <div className={styles.scannerContainer}>
        <MainUiButton
          Icon={FaTimes}
          variant={"secondary"}
          onClick={onClose}
          className={styles.closeButton}
        />
        <QrScanner
          onError={handleError}
          onScan={handleScan}
          facingMode={"environment"}
          constraints={{
            audio: false,
            video: { facingMode: "environment" }
          }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}