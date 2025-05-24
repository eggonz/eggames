import type ColorPalette from "./ColorPalette"
import type { Player } from "./Player"

interface Team {
  id: number // team ID
  color: ColorPalette // team color
  players: Player[]
}

export type { Team }