import type { WordGuessConfig } from "../types/GameConfig"
import type { WordGuessProgress } from "../types/GameProgress"
import type { Team } from "../types/Team"

function getWinnerTeam(config: WordGuessConfig, progress: WordGuessProgress): Team | null {
  const idx = getWinnerTeamIdx(config, progress)
  if (idx === null) return null
  const winningTeam = config.teams[idx]
  if (!winningTeam) {
    console.error("No winning team") // This should not happen
    return null
  }
  return winningTeam
}

function getWinnerTeamIdx(config: WordGuessConfig, progress: WordGuessProgress): number | null {
  const winningIdx = Object.values(progress.scores).findIndex(score => score === config.pointsToWin)
  return winningIdx === -1 ? null : winningIdx
}

export { getWinnerTeam, getWinnerTeamIdx }