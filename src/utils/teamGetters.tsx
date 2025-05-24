import type { WordGuessConfig } from "../types/GameConfig"
import type { WordGuessProgress } from "../types/GameProgress"
import type { Player } from "../types/Player"
import type { Team } from "../types/Team"

function getCurrent(config: WordGuessConfig, progress: WordGuessProgress): { team: Team, player: Player } {
  const team = config.teams[progress.teamIdx]
  const player = team.players[progress.lastPlayerPerTeam[progress.teamIdx]]
  return { team, player }
}

function getNext(config: WordGuessConfig, progress: WordGuessProgress): { nextTeam: Team, nextPlayer: Player } {
  const nextTeamIdx = (progress.teamIdx + 1) % config.teams.length
  const nextPlayerIdx = (progress.lastPlayerPerTeam[nextTeamIdx] + 1) % config.teams[nextTeamIdx].players.length
  const nextTeam = config.teams[nextTeamIdx]
  const nextPlayer = nextTeam.players[nextPlayerIdx]
  return { nextTeam, nextPlayer }
}

function getCurrentIdx(progress: WordGuessProgress): { teamIdx: number, playerIdx: number } {
  const teamIdx = progress.teamIdx
  const playerIdx = progress.lastPlayerPerTeam[teamIdx]
  return { teamIdx, playerIdx }
}

function getNextIdx(config: WordGuessConfig, progress: WordGuessProgress): { nextTeamIdx: number, nextPlayerIdx: number } {
  const nextTeamIdx = (progress.teamIdx + 1) % config.teams.length
  const nextPlayerIdx = (progress.lastPlayerPerTeam[nextTeamIdx] + 1) % config.teams[nextTeamIdx].players.length
  return { nextTeamIdx, nextPlayerIdx }
}

export { getCurrent, getNext, getCurrentIdx, getNextIdx }