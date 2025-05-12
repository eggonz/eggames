import React from 'react';
import './common.css';
import './GamesPage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function GamesPage() {
  const navigate = useNavigate();
  
  const games = [
    { id: 1, name: "Tic Tac Toe", description: "Classic X's and O's game" },
    { id: 2, name: "Memory Match", description: "Test your memory skills" },
    { id: 3, name: "Snake", description: "Classic snake game" },
    { id: 4, name: "Puzzle", description: "Sliding puzzle challenge" },
    { id: 5, name: "Word Hunt", description: "Find hidden words" },
    { id: 6, name: "Chess", description: "Strategic board game" }
  ];

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
          { games.map(game => (
            <div key={game.id} className="game-card" onClick={() => console.log(`Selected ${game.name}`)}>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GamesPage;