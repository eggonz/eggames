import './common.css';
import './PlayersPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { storePlayers, getStoredPlayers } from '../utils/playersStorage';

function PlayersPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(getStoredPlayers());
  const [newPlayer, setNewPlayer] = useState({ name: '' });

  // Update localStorage whenever players change
  useEffect(() => {
    storePlayers(players);
  }, [players]);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (newPlayer.name) {
      setPlayers([...players, { ...newPlayer, id: Date.now() }]);
      setNewPlayer({ name: ''});
    }
  };

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleEditPlayer = (id, updatedPlayer) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, ...updatedPlayer } : player
    ));
  };

  return (
    <div className="page players-page">
      <header>
        <button className="header-button"
                onClick={() => navigate('/')}
        >
          <FaCheck />
        </button>
        <h1 className="header-title">Players</h1>
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
        </div>
      </main>
    </div>
  );
}

export default PlayersPage;