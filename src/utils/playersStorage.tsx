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
 * - `getStoredPlayersCount`: Returns the count of stored players.
 * - `clearPlayers`: Clears all stored player data from localStorage.
 */

import type { Player } from "../types/Player.tsx";

// Constants
const STORAGE_KEY = 'gamePlayersList';

// Functions
const getStoredPlayers = () => {
  const storedPlayers = localStorage.getItem(STORAGE_KEY);
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

const storePlayers = (players: Player[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

const getStoredPlayersCount = () => {
  const storedPlayers = getStoredPlayers();
  return storedPlayers.length;
};

const clearPlayers = () => {
  localStorage.removeItem(STORAGE_KEY);
}

export { getStoredPlayers, storePlayers, getStoredPlayersCount, clearPlayers };