import type { GameConfig } from "../types/GameConfig";
import type { GameProgress } from "../types/GameProgress"

// Constants
const CONFIG_STORAGE_KEY_PREFIX = 'gameConfig_'
const PROGRESS_STORAGE_KEY_PREFIX = 'gameProgress_'

// Functions
export const getStoredConfig = (gameId: string): GameConfig | null => {
  const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY_PREFIX + gameId)
  return storedConfig ? JSON.parse(storedConfig) : null
};

export const storeConfig = (gameId: string, config: GameConfig) => {
  localStorage.setItem(CONFIG_STORAGE_KEY_PREFIX + gameId, JSON.stringify(config))
};

export const clearStoredConfig = (gameId: string) => {
  localStorage.removeItem(CONFIG_STORAGE_KEY_PREFIX + gameId)
}

export const getStoredProgress = (gameId: string): GameProgress | null => {
  const storedConfig = localStorage.getItem(PROGRESS_STORAGE_KEY_PREFIX + gameId)
  return storedConfig ? JSON.parse(storedConfig) : null
};

export const storeProgress = (gameId: string, progress: GameProgress) => {
  localStorage.setItem(PROGRESS_STORAGE_KEY_PREFIX + gameId, JSON.stringify(progress))
};

export const clearStoredProgress = (gameId: string) => {
  localStorage.removeItem(PROGRESS_STORAGE_KEY_PREFIX + gameId)
}