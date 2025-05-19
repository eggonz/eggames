import type { GameConfig } from "./GameConfig"

export interface DummyConfig extends GameConfig {
  difficulty: number // 1-10
  spicyLevel: number // 0-2
  timeLimit: number // 15-120
  useGenAi: boolean
}