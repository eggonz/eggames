import type { GameConfig } from "./GameConfig"

export interface DummyConfig extends GameConfig {
  difficulty: number // 1-10
  spicyLevel: number // 0-2
  timeLimit: number // 15-120
  useGenAi: boolean
}

export const DEFAULT_DUMMY_CONFIG: DummyConfig = {
  configured: false,
  difficulty: 5,
  spicyLevel: 0,
  timeLimit: 30,
  useGenAi: false
}