import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../common.css';
import './TruthOrDarePage.css';

function TruthOrDareSettings() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    truthProbability: 50,
    minPlayers: 2,
    timeLimit: 30,
    customTruths: [],
    customDares: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartGame = () => {
    navigate('?view=play', { state: { config } });
  };

  return (
    <div className="config-container">
      <div className="config-form">
        <div className="config-item">
          <label htmlFor="truthProbability">Truth Probability</label>
          <div className="slider-container">
            <input
              type="range"
              id="truthProbability"
              name="truthProbability"
              min="0"
              max="100"
              value={config.truthProbability}
              onChange={handleInputChange}
              className="slider"
            />
            <span className="slider-value">{config.truthProbability}%</span>
          </div>
        </div>

        <div className="config-item">
          <label htmlFor="minPlayers">Minimum Players</label>
          <input
            type="number"
            id="minPlayers"
            name="minPlayers"
            min="2"
            max="20"
            value={config.minPlayers}
            onChange={handleInputChange}
            className="number-input"
          />
        </div>

        <div className="config-item">
          <label htmlFor="timeLimit">Time Limit (seconds)</label>
          <input
            type="number"
            id="timeLimit"
            name="timeLimit"
            min="10"
            max="120"
            value={config.timeLimit}
            onChange={handleInputChange}
            className="number-input"
          />
        </div>

        <button
          className="primary-button"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default TruthOrDareSettings;