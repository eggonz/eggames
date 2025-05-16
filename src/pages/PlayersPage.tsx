import './PlayersPage.css';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { clearPlayers, getStoredPlayers, storePlayers } from '../utils/playersStorage';
import type { NewPlayer, Player } from "../types/Player";
import Header from "../components/Header";
import IconDetail from "../components/IconDetail";

// Components

function PlayerForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="icon-button">
        <FaPlus />
      </button>
    </form>
  );
}

interface PlayerItemProps {
  player: Player;
  editFn: (id: number, updatedPlayer: NewPlayer) => void;
  deleteFn: (id: number) => void;
}

function PlayerItem({ player, editFn, deleteFn }: PlayerItemProps) {
  return (
    <div key={player.id} className="player-item">
      <span>{player.name}</span>
      <button
        className="icon-button"
        onClick={() => {
          const newName = prompt('Enter new name:', player.name);
          if (newName) {
            editFn(player.id, { name: newName });
          }
        }}
      >
        <FaPencilAlt />
      </button>
      <button
        className="icon-button"
        onClick={() => deleteFn(player.id)}
      >
        <FaTrash className="fa-trash"/>
      </button>
    </div>
  )
}

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="clear-players-button"
      onClick={onClick}
    >
      <FaTrash /> Clear All
    </button>
  );
}

// Main Component
function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>(getStoredPlayers())

  // Update localStorage whenever players change
  useEffect(() => {
    storePlayers(players);
  }, [players]);

  return (
    <div className="page">
      <Header
        leftBtn={{
          icons: [FaCheck],
          navDst: '/',
        }}
        title="Players"
        rightDiv={<IconDetail Icon={FaUsers} text={players.length} />}
      />
      <main>
        <div className="players-page">
          <PlayerForm
            onSubmit={(name) => {
              setPlayers([...players, {id: Date.now(), name}])
            }}
          />

          <div className="players-list">
            {players.map(player => (
              <PlayerItem
                key={player.id}
                player={player}
                editFn={(id, updatedPlayer) => {
                  setPlayers(players.map((p: Player) =>
                    p.id === id ? {...p, ...updatedPlayer} : p
                  ))
                }}
                deleteFn={(id) => {
                  setPlayers(players.filter((p: Player) => p.id !== id))
                }}
              />
            ))}
          </div>

          <ClearButton
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all players?')) {
                setPlayers([]);
                clearPlayers();
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default PlayersPage;