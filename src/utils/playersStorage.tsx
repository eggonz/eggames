/**
 * Utility functions for managing player data in localStorage.
 *
 * This file provides functions to store, retrieve, count, and clear player data
 * from the browser's localStorage. It uses a predefined storage key to manage
 * the data.
 *
 * Functions:
 * - `getStoredPlayers`: Retrieves the list of stored players from localStorage.
 * - `storePlayers`: Stores a list of players in localStorage.
 * - `clearPlayers`: Clears all stored player data from localStorage.
 */

import type { Player } from "../types/Player.tsx"

// Constants
const STORAGE_KEY = 'gamePlayersList'

// Functions
function getStoredPlayers(): Player[] {
  const storedPlayers = localStorage.getItem(STORAGE_KEY)
  return storedPlayers ? JSON.parse(storedPlayers) : []
}

function storePlayers(players: Player[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
}

function clearStoredPlayers(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export { getStoredPlayers, storePlayers, clearStoredPlayers }