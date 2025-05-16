import { useState } from 'react';
import '../common.css';
import './TruthOrDarePage.css';
import { useLocation } from 'react-router-dom';

// Types
interface GameConfig {
  truthProbability: number; // 0-100
  spicyLevel: number; // 0-2
  timeLimit: number; // seconds
  useGenAi: boolean; // toggle
}

interface GameState {
  type: 'truth' | 'dare' | null;
  question: string | null;
}

// Constants
const DEFAULT_CONFIG: GameConfig = {
  truthProbability: 50,  // slider 0-100
  spicyLevel: 0,  // select 0-2
  timeLimit: 30,  // seconds (+-15)
  useGenAi: false,  // toggle
}

// Main Component
function TruthOrDarePlay() {
  const location = useLocation();
  const [currentPlayer] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    type: null, // 'truth' or 'dare'
    question: null,
  });

  const config = location.state?.config || DEFAULT_CONFIG;

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