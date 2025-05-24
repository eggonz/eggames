import React from "react"
import { FaCrown, FaForward } from "react-icons/fa"
import MainUiButton from "../../../components/MainUiButton"
import PieChart from "../../../components/PieChart"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { getWinnerTeamIdx } from "../../../utils/teamOps"
import styles from "./PointsView.module.css"

interface PointsViewProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
  onClickNext: () => void
  onClickWinner: () => void
}

export default function PointsView({ config, progress, setProgress, onClickNext, onClickWinner }: PointsViewProps) {

  const winningTeamIdx = getWinnerTeamIdx(config, progress)

  return (
    <div className={styles.play}>
      <h2>POINT COUNT</h2>
      <div className={styles.pieContainer}>
        <PieChart
          slices={config.numTeams}
          colors={config.teams.map(team => team.color.primary)}
          labels={Object.values(progress.scores).map(score => score.toString())}
          selectedIdx={progress.roundWinnerTeamIdx ?? winningTeamIdx ?? undefined}
        />
      </div>
      {winningTeamIdx !== null? (
        <MainUiButton
          Icon={FaCrown}
          onClick={onClickWinner}
          className={styles.mainGameButton}
        />
      ) : (
        <MainUiButton
          Icon={FaForward}
          onClick={onClickNext}
          className={styles.mainGameButton}
        />
      )}
    </div>
  )
}