import React, { useState } from "react"
import { FaForward, FaLightbulb, FaSadCry } from "react-icons/fa"
import MainUiButton from "../../../components/MainUiButton"
import PieChart from "../../../components/PieChart"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import styles from "./GuessedView.module.css"

interface GuessedViewProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onClick: () => void // Clicking either the pie chart or the 'none' button, move to next view
}

export default function GuessedView({ config, progress, setProgress, onClick }: GuessedViewProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>() // selected section in pie chart, 0-indexed

  const handleClickPie = (idx: number) => {
    // idx is 0-indexed, selectedIdx is 0-indexed
    if (idx === selectedIdx) setSelectedIdx(undefined) // deselect if already selected
    else setSelectedIdx(idx) // select the clicked section
  }

  const handleClickNone = () => {
    const confirmNone = window.confirm("Are you sure no one guessed the word?\nNo points will be awarded.")
    if (!confirmNone) return
    onClick()
  }

  const handleClickNext = () => {
    if (selectedIdx === undefined) {
      console.error("No team selected") // This should not happen
      return
    }
    setProgress(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [selectedIdx]: prev.scores[selectedIdx] + 1,
      },
      roundWinnerTeamIdx: selectedIdx,
    }))
    onClick()
  }

  return (
    <div className={styles.play}>
      <h2>Who guessed?</h2>
      <div className={styles.pieContainer}>
        <PieChart
          slices={config.numTeams}
          colors={config.teams.map(team => team.color.primary)}
          onClick={handleClickPie}
          selectedIdx={selectedIdx}
          Icon={FaLightbulb}
        />
      </div>
      <MainUiButton
        Icon={selectedIdx !== undefined? FaForward : FaSadCry}
        onClick={selectedIdx  !== undefined? handleClickNext : handleClickNone}
        className={styles.mainGameButton}
      />
    </div>
  )
}