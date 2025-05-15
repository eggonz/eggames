import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../common.css';
import './TruthOrDarePage.css';

const TRUTH_PROB_DEFAULT = 50;
const TRUTH_PROB_MIN = 0;
const TRUTH_PROB_MAX = 100;
const TIME_LIMIT_MIN = 15;
const TIME_LIMIT_MAX = 120;
const TIME_LIMIT_STEP = 15;
const TIME_LIMIT_DEFAULT = 30;
const SpicyLevel = {
  MILD: 0,
  MEDIUM: 1,
  HOT: 2
}
const USE_GEN_AI_DEFAULT = false;

function TruthOrDareSettings() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    truthProbability: TRUTH_PROB_DEFAULT,
    spicyLevel: SpicyLevel.MILD,
    timeLimit: TIME_LIMIT_DEFAULT,
    useGenAi: USE_GEN_AI_DEFAULT
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTimeLimitChange = (direction) => {
    setConfig(prev => ({
      ...prev,
      timeLimit: Math.max(TIME_LIMIT_MIN, Math.min(TIME_LIMIT_MAX,
        prev.timeLimit + (direction * TIME_LIMIT_STEP)))
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
              min={TRUTH_PROB_MIN}
              max={TRUTH_PROB_MAX}
              value={config.truthProbability}
              onChange={handleInputChange}
              className="slider"
            />
            <span className="slider-value">{config.truthProbability}%</span>
          </div>
        </div>

        <div className="config-item">
          <label htmlFor="spicyLevel">Spicy Level</label>
          <div className="spicy-blocks">
            <button
              type="button"
              className={`spicy-block ${config.spicyLevel === SpicyLevel.MILD ? 'selected' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.MILD }))}
            >
              Mild
            </button>
            <button
              type="button"
              className={`spicy-block ${config.spicyLevel === SpicyLevel.MEDIUM ? 'selected' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.MEDIUM }))}
            >
              Medium
            </button>
            <button
              type="button"
              className={`spicy-block ${config.spicyLevel === SpicyLevel.HOT ? 'selected' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, spicyLevel: SpicyLevel.HOT }))}
            >
              Hot
            </button>
          </div>
        </div>

        <div className="config-item">
          <label htmlFor="timeLimit">Time Limit</label>
          <div className="time-limit-container">
            <button
              type="button"
              onClick={() => handleTimeLimitChange(-1)}
              disabled={config.timeLimit <= TIME_LIMIT_MIN}
              className="time-button"
            >
              -{TIME_LIMIT_STEP}s
            </button>
            <span className="time-display">{config.timeLimit}s</span>
            <button
              type="button"
              onClick={() => handleTimeLimitChange(1)}
              disabled={config.timeLimit >= TIME_LIMIT_MAX}
              className="time-button"
            >
              +{TIME_LIMIT_STEP}s
            </button>
          </div>

        </div>

        <div className="config-item config-item-gen-ai">
          <label>Use AI Generation</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="useGenAi"
              name="useGenAi"
              checked={config.useGenAi}
              onChange={handleInputChange}
              className="toggle-input"
            />
            <label className="toggle-label" htmlFor="useGenAi">
              <span className="toggle-button"></span>
            </label>
          </div>
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