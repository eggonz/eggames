import type { GameConfig } from "../types/GameConfig";
import type { GameProgress } from "../types/GameProgress"

// Constants
const CONFIG_STORAGE_KEY_PREFIX = 'gameConfig_'
const PROGRESS_STORAGE_KEY_PREFIX = 'gameProgress_'

// Functions
function getStoredConfig(gameId: string): GameConfig | null {
  const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY_PREFIX + gameId)
  return storedConfig ? JSON.parse(storedConfig) : null
}

function storeConfig(gameId: string, config: GameConfig) {
  localStorage.setItem(CONFIG_STORAGE_KEY_PREFIX + gameId, JSON.stringify(config))
}

function clearStoredConfig(gameId: string) {
  localStorage.removeItem(CONFIG_STORAGE_KEY_PREFIX + gameId)
}

function getStoredProgress(gameId: string): GameProgress | null {
  const storedConfig = localStorage.getItem(PROGRESS_STORAGE_KEY_PREFIX + gameId)
  return storedConfig ? JSON.parse(storedConfig) : null
}

function storeProgress(gameId: string, progress: GameProgress) {
  localStorage.setItem(PROGRESS_STORAGE_KEY_PREFIX + gameId, JSON.stringify(progress))
}

function clearStoredProgress(gameId: string) {
  localStorage.removeItem(PROGRESS_STORAGE_KEY_PREFIX + gameId)
}

export { getStoredConfig, storeConfig, clearStoredConfig, getStoredProgress, storeProgress, clearStoredProgress }