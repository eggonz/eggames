import React from 'react';
import './common.css';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';

function GameCard({ key, game }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div key={key} className="game-card" onClick={handleClick}>
      <h3>{game.name}</h3>
      <p>{game.description}</p>
    </div>
  );
}

export default GameCard;