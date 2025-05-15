import React, { useState, useEffect } from 'react';
import '../common.css';
import './TruthOrDarePage.css';
import { useNavigate, useLocation } from 'react-router-dom';

function TruthOrDarePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameState, setGameState] = useState({
    type: null, // 'truth' or 'dare'
    question: null,
  });

  const config = location.state?.config || {
    truthProbability: 50,  // slider 0-100
    spicyLevel: 0,  // select 0-2
    timeLimit: 30,  // seconds (+-15)
    useGenAi: false,  // toggle
  };

  const generateChallenge = () => {
    const isTruth = Math.random() * 100 < config.truthProbability;
    setGameState({
      type: isTruth ? 'truth' : 'dare',
      question: isTruth ?
        'What is your biggest fear?' : // Placeholder truth question
        'Dance like nobody is watching' // Placeholder dare challenge
    });
  };

  return (
    <div className="play-container">
      {currentPlayer && (
        <div className="player-turn">
          <h3>{currentPlayer}'s Turn</h3>
        </div>
      )}

      {gameState.type ? (
        <div className={`challenge-container ${gameState.type}`}>
          <h3>{gameState.type.toUpperCase()}</h3>
          <p>{gameState.question}</p>
        </div>
      ) : (
        <button
          className="primary-button"
          onClick={generateChallenge}
        >
          Generate Challenge
        </button>
      )}

      <div className="game-controls">
        <button
          className="secondary-button"
          onClick={() => setGameState({ type: null, question: null })}
        >
          Next Turn
        </button>
      </div>
    </div>
  );
}

export default TruthOrDarePlay;