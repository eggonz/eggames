import type { GameConfig } from "../types/GameConfig";

// Constants
const STORAGE_KEY_PREFIX = 'gameConfig_'

// Functions
const getStoredConfig = (gameId: string): GameConfig | null => {
  const storedConfig = localStorage.getItem(STORAGE_KEY_PREFIX + gameId)
  return storedConfig ? JSON.parse(storedConfig) : null
};

const storeConfig = (gameId: string, config: GameConfig) => {
  localStorage.setItem(STORAGE_KEY_PREFIX + gameId, JSON.stringify(config))
};

const clearStoredConfig = (gameId: string) => {
  localStorage.removeItem(STORAGE_KEY_PREFIX + gameId)
}

export { getStoredConfig, storeConfig, clearStoredConfig }