import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="header">
        <button className="header-button">Home</button>
        <h1 className="header-title">Games</h1>
        <button className="header-button">Settings</button>
      </header>
      <main>
        <div className="button-container">
          {/*<button className="start-button">Start</button>*/}
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