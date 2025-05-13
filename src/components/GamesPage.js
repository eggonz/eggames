import React from 'react';
import './common.css';
import './GamesPage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import GameCard from './GameCard';
import { AVAILABLE_GAMES } from '../data/gameData';

function GamesPage() {
  const navigate = useNavigate();

  return (
    <div className="page games-page">
      <header>
        <button 
          className="header-button"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft />
        </button>
        <h1 className="header-title">Games</h1>
      </header>
      <main>
        <div className="games-grid">
          {AVAILABLE_GAMES.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default GamesPage;