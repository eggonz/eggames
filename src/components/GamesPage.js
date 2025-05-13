import React from 'react';
import './common.css';
import './GamesPage.css';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft, FaUsers} from 'react-icons/fa';
import GameCard from './GameCard';
import { AVAILABLE_GAMES } from '../data/gameData';
import {getStoredPlayersCount} from "../utils/playersStorage";

function GamesPage() {
  const navigate = useNavigate();

  return (
    <div className="page games-page">
      <header>
        <button 
          className="header-fixed-left header-button"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft />
        </button>
        <div className="header-title">
          <h1>Games</h1>
        </div>
        <div className="header-fixed-right icon-detail"><FaUsers /><span>{getStoredPlayersCount()}</span></div>
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