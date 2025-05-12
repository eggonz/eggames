import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="header-title">eggonz Games</h1>
      </header>
      <main>
        <div className="button-container">
          <button
            onClick={() => navigate('/players')}
            className="navigate-button"
          >
            Manage Players
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;