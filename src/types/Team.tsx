import type { Player } from "./Player"

interface Team {
  id: number // team ID
  color: string // team color
  players: Player[]
}

export type { Team }