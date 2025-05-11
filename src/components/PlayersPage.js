// src/components/PlayersPage.js
import React, { useState } from 'react';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '' });

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
    <div className="players-page">
      <h1>Players Management</h1>
      
      {/* Add Player Form */}
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          placeholder="Player Name"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        />
        <button type="submit">Add Player</button>
      </form>

      {/* Players List */}
      <div className="players-list">
        {players.map(player => (
          <div key={player.id} className="player-item">
            <span>{player.name}</span>
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
            <button onClick={() => {
              const newName = prompt('Enter new name:', player.name);
              if (newName) {
                handleEditPlayer(player.id, { name: newName });
              }
            }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersPage;