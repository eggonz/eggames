import React, { useEffect, useState } from "react"
import { FaHourglassEnd, FaInfinity, FaLightbulb, FaRedoAlt } from "react-icons/fa"
import IconDetail from "../../../components/IconDetail"
import IconsButton from "../../../components/IconsButton"
import MainUiButton from "../../../components/MainUiButton"
import RotatingHourglass from "../../../components/RotatingHourglass"
import { LOADING } from "../../../constants/elements"
import { MAX_SKIP_TURNS } from "../../../constants/WordGuessView"
import WordLoader, { type WordEntry } from "../../../data/WordLoader"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { getCurrent } from "../../../utils/teamGetters"
import { secondsToString } from "../../../utils/timeFunctions"
import styles from "./CardView.module.css"

interface PreInitProps {
  loader: WordLoader<WordEntry>
  config: WordGuessConfig
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
}

function preInit({ loader, config, setProgress }: PreInitProps): void {
  const { word, tag } = loader.getRandom()
  console.log("Random word:", word, tag)
  const newSecret = tag? `${word}\n[${tag}]` : word
  console.log("New secret:", newSecret)
  setProgress(prev => ({
    ...prev,
    secret: newSecret,
    timer: config.turnDuration,
    timerRunning: false,
    skipsLeft: config.allowInfiniteSkips? -1 : MAX_SKIP_TURNS,
  }))
}

interface CardViewProps {
  loader: WordLoader<WordEntry>
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onTimeUp: () => void
  onClickGuessed: () => void
}

export default function CardView({ loader, config, progress, setProgress, onTimeUp, onClickGuessed }: CardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (progress.timerRunning && progress.timer > 0) {
      intervalId = setInterval(() => {
        setProgress(prev => {
          const newTimer = prev.timer - 1
          if (newTimer === 0) {
            onTimeUp()
            return { ...prev, timer: 0, timerRunning: false }
          }
          return { ...prev, timer: newTimer }
        })
      }, 1000)
    }

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [progress.timerRunning, progress.timer, setProgress, onTimeUp])

  // Pre-Init
  useEffect(() => {
    if (!loader) return
    preInit({ loader, config, setProgress })
  }, [])

  // Render

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    // Start timer when card is flipped
    if (progress.timerRunning) return
    setProgress(prev => ({
      ...prev,
      timerRunning: true,
    }))
  }

  const handleSkip = () => {
    if (config.allowInfiniteSkips || progress.skipsLeft > 0) {
      const { word, tag } = loader.getRandom()
      const newSecret = tag? `${word}\n[${tag}]` : word
      setIsFlipped(false)
      // wait for animation to finish before setting the new secret
      setTimeout(() => {
        setProgress((prev: WordGuessProgress) => {
          return ({
            ...prev,
            skipsLeft: config.allowInfiniteSkips? -1 : prev.skipsLeft - 1,
            secret: newSecret,
            // timer: config.turnDuration, // TODO reset timer ??
          })
        })
      }, 300) // half of the animation duration
    }
  }

  if (progress.teamIdx < 0) return LOADING

  const { team, player } = getCurrent(config, progress)
  if (!progress.secret) console.info("No secret")  // tmp secret is hidden at first render

  return (
    <div className={styles.play}>
      <h2><span>TURN:</span> <span className={styles.playerName}>{player.name}</span></h2>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
          onClick={handleCardClick}
        >
          <div className={`${styles.cardFace} ${styles.cardFront}`} style={{backgroundColor: team.color.soft}}>
            ?
          </div>
          <div className={`${styles.cardFace} ${styles.cardBack}`} style={{backgroundColor: team.color.soft}}>
            {progress.secret || "SECRET"}
          </div>
        </div>
      </div>
      <div className={styles.timerContainer}>
        <IconDetail Icon={progress.timerRunning? RotatingHourglass : FaHourglassEnd}
                    text={secondsToString(progress.timer)}
                    className={progress.timer < 10 ? styles.urgent : ""}
        />
        <IconsButton
          icons={[FaRedoAlt]}
          onClick={handleSkip}
          disabled={!config.allowInfiniteSkips && progress.skipsLeft === 0}
        />
        <span>{config.allowInfiniteSkips? <FaInfinity /> : progress.skipsLeft}</span>
      </div>
      <MainUiButton
        Icon={FaLightbulb}
        onClick={onClickGuessed}
        className={styles.mainGameButton}
      />
    </div>
  )
}