import React from 'react';
import './common.css';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import {FaDice, FaShareAlt, FaUserEdit, FaUsers} from "react-icons/fa";
import {getStoredPlayersCount} from "../utils/playersStorage";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <header>
        <button className="header-fixed-left header-button"
                onClick={() => navigate('/share')}
        >
          <FaShareAlt />
        </button>
        <h1 className="header-title">eggames</h1>
      </header>
      <main>
        <div className="home-menu-container">
          <button
            onClick={() => navigate('/games')}
            className="home-menu-button"
          >
            <FaDice /> <span>Play Games</span>
          </button>
          <button
            onClick={() => navigate('/players')}
            className="home-menu-button"
          >
            <FaUserEdit /> <span>Manage Players</span>
          </button>
          <div className="icon-detail"><FaUsers /><span>{getStoredPlayersCount()}</span></div>
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