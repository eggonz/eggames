import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <button className="header-button">Home</button>
        <h1 className="header-title">Games</h1>
        <button className="header-button">Settings</button>
      </header>
      <main>
        <div className="button-container">
          <button className="start-button">Start</button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;