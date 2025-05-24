import React, { useEffect } from "react"
import { LOADING } from "../../../constants/elements"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { getCurrent, getNextIdx } from "../../../utils/teamGetters"
import styles from "./NextView.module.css"

interface PreInitProps {
  config: WordGuessConfig
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
}

function preInit({ config, setProgress }: PreInitProps) {
  setProgress(prev => {
    const { nextTeamIdx, nextPlayerIdx } = getNextIdx(config, prev)
    return ({
      ...prev,
      lastPlayerPerTeam: {
        ...prev.lastPlayerPerTeam,
        [nextTeamIdx]: nextPlayerIdx,
      },
      teamIdx: nextTeamIdx,
      secret: null,
      roundWinnerTeamIdx: null,
    })
  })
}

interface NextViewProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onClickNext: () => void
}

export default function NextView({ config, progress, setProgress, onClickNext }: NextViewProps) {

  // Pre-Init
  useEffect(() => {
    preInit({ config, setProgress })
  }, [])

  // Render

  if (progress.teamIdx < 0) return LOADING

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
        <div className={styles.circle} style={{ backgroundImage: gradient }} onClick={onClickNext}>
          {player.name}
        </div>
      </div>
      <span className={styles.startText}>Click to start!</span>
    </div>
  )
}