import React from "react"
import { FaLightbulb, FaSadCry } from "react-icons/fa"
import IconCanvas from "../../../components/IconCanvas"
import MainUiButton from "../../../components/MainUiButton"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import styles from "./TimeupView.module.css"

interface TimeupViewProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onClickGuessed: () => void
  onClickNext: () => void
}

export default function TimeupView({ config, progress, setProgress, onClickGuessed, onClickNext }: TimeupViewProps) {
  return (
    <div className={styles.play}>
      <h2>Time's Up!</h2>
      <div className={styles.canvasContainer}>
        <IconCanvas/>
      </div>
      <span className={styles.secretWord}>{progress.secret}</span>
      <div className={styles.bottomButtons}>
        <MainUiButton
          Icon={FaLightbulb}
          onClick={onClickGuessed}
          className={styles.mainGameButton}
        />
        <MainUiButton
          Icon={FaSadCry}
          onClick={onClickNext}
          className={styles.mainGameButton}
        />
      </div>
    </div>
  )
}