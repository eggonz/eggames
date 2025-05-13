import React from 'react';
import './common.css';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';
import { FaStopwatch, FaUsers, FaBirthdayCake } from "react-icons/fa";
import { DISPLAY_AGE } from "../data/gameData";

function GameCard({ key, game }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div key={key} className="game-card" onClick={handleClick}>
      <h3>{game.name}</h3>
      <p className="game-card-details">
        <span><FaStopwatch className="icon"/> <span className="detail">{game.time}</span></span>
        <span><FaUsers className="icon"/> <span className="detail">{game.people}</span></span>
        {DISPLAY_AGE && game.age && (
          <span><FaBirthdayCake className="icon" /> <span className="detail">Age {game.age}</span></span>
        )}
      </p>
      <p className="game-card-desc">{game.description}</p>
    </div>
  );
}

export default GameCard;