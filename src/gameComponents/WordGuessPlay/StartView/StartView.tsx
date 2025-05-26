import React from "react"
import { MAX_SKIP_TURNS } from "../../../constants/WordGuessView"
import WordLoader, { type WordEntry } from "../../../data/WordLoader"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { formatSecret } from "../../../utils/secretFormatter"
import { getCurrent } from "../../../utils/teamGetters"
import styles from "./StartView.module.css"

interface StartViewProps {
  loader: WordLoader<WordEntry>
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onClickNext: () => void
}

export default function StartView({ loader, config, progress, setProgress, onClickNext }: StartViewProps) {

  const handleClickNext = () => {
    setProgress(prev => ({
      ...prev,
      secret: formatSecret(loader.getRandom()), // Set new secret
      timer: config.turnDuration,
      timerRunning: false,
      skipsLeft: config.allowInfiniteSkips? -1 : MAX_SKIP_TURNS,
    }))
    onClickNext()
  }

  const { team, player } = getCurrent(config, progress)
  const gradient = `radial-gradient(circle at center, 
    ${team.color.primary} 0%, 
    ${team.color.primary} 50%, 
    ${team.color.secondary} 100%
  )`

  return (
    <div className={styles.play}>
      <h2>NEXT TURN</h2>
      <div className={styles.circleContainer}>
        <div className={styles.circle} style={{ backgroundImage: gradient }} onClick={handleClickNext}>
          {player.name}
        </div>
      </div>
      <span className={styles.startText}>Click to start!</span>
    </div>
  )
}