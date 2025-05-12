import React from 'react';
import './common.css';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import {FaShareAlt} from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <header>
        <button className="header-button"
                onClick={() => navigate('/share')}
        >
          <FaShareAlt />
        </button>
        <h1 className="header-title">eggames</h1>
      </header>
      <main>
        <div className="button-container">
          <button
            onClick={() => navigate('/games')}
            className="navigate-button"
          >
            Play Games
          </button>
          <button
            onClick={() => navigate('/players')}
            className="navigate-button"
          >
            Manage Players
          </button>
        </div>
      </main>
      <footer>
        <p>2025 eggames</p>
        <p>v1.0.0</p>
      </footer>
    </div>
  );
}

export default HomePage;