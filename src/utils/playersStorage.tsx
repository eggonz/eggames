// Utility functions for localStorage
const STORAGE_KEY = 'gamePlayersList';

const getStoredPlayers = () => {
  const storedPlayers = localStorage.getItem(STORAGE_KEY);
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

const storePlayers = (players) => {
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