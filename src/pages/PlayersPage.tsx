import './common.css';
import './PlayersPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaPencilAlt, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { clearPlayers, getStoredPlayers, getStoredPlayersCount, storePlayers } from '../utils/playersStorage';
import type { NewPlayer, Player } from "../types/Player.tsx";

function PlayersPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(getStoredPlayers());
  const [playerCount, setPlayersCount] = useState<number>(getStoredPlayersCount());
  const [newPlayer, setNewPlayer] = useState<NewPlayer>({ name: '' });

  // Update localStorage whenever players change
  useEffect(() => {
    storePlayers(players);
  }, [players]);

  const handleAddPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPlayer.name) {
      setPlayers([...players, { ...newPlayer, id: Date.now() }]);
      setNewPlayer({ name: ''});
      setPlayersCount(players.length + 1);
    }
  };

  const handleDeletePlayer = (id: number) => {
    setPlayers(players.filter((player: Player) => player.id !== id));
    setPlayersCount(players.length - 1);
  };

  const handleEditPlayer = (id: number, updatedPlayer: NewPlayer) => {
    setPlayers(players.map((player: Player) =>
      player.id === id ? { ...player, ...updatedPlayer } : player
    ));
  };

  const handleClearPlayers = () => {
    clearPlayers();
    setPlayers([]);
    setPlayersCount(0);
  }

  return (
    <div className="page players-page">
      <header>
        <button className="header-fixed-left header-button"
                onClick={() => navigate('/')}
        >
          <FaCheck />
        </button>
        <div className="header-title">
          <h1>Players</h1>
        </div>
        <div className="header-fixed-right icon-detail"><FaUsers /><span>{playerCount}</span></div>
      </header>
      <main>
        {/* Add Player Form */}
        <form onSubmit={handleAddPlayer}>
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <button type="submit" className="icon-button">
            <FaPlus />
          </button>
        </form>

        {/* Players List */}
        <div className="players-list">
          {players.map(player => (
            <div key={player.id} className="player-item">
              <span>{player.name}</span>
              <button
                className="icon-button"
                onClick={() => {
                  const newName = prompt('Enter new name:', player.name);
                  if (newName) {
                    handleEditPlayer(player.id, { name: newName });
                  }
                }}
              >
                <FaPencilAlt />
              </button>
              <button 
                className="icon-button"
                onClick={() => handleDeletePlayer(player.id)}
              >
                <FaTrash className="fa-trash"/>
              </button>
            </div>
          ))}
          <button
            className="clear-players-button"
            onClick={handleClearPlayers}
          >
            <FaTrash /> Clear All
          </button>
        </div>
      </main>
    </div>
  );
}

export default PlayersPage;