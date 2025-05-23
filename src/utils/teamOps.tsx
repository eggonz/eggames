import type { WordGuessConfig } from "../types/GameConfig"
import type { WordGuessProgress } from "../types/GameProgress"
import type { Team } from "../types/Team"

function getWinnerTeam(config: WordGuessConfig, progress: WordGuessProgress): Team | null {
  const teams: Team[] = config.teams
  const scores: { [teamId: string]: number } = progress.scores
  const maxScore: number = Math.max(...Object.values(scores))
  const winningTeams: Team[] = teams.filter(team => scores[team.id] === maxScore)
  return winningTeams.length > 1 ? null : winningTeams[0]
}

export { getWinnerTeam }