import './HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDice, FaShareAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import type { Player } from "../types/Player";
import { getStoredPlayers } from "../utils/playersStorage";
import Header from "../components/Header"
import Footer from "../components/Footer";
import IconDetail from "../components/IconDetail";

function HomePage() {
  const navigate = useNavigate()
  const [players] = useState<Player[]>(getStoredPlayers())

  return (
    <div className="page home-page">
      <Header
        leftBtn={{
          icons: [FaShareAlt],
          navDst: '/share',
        }}
        title="eggames"
      />
      <main>
        <div className="home-menu-container">
          <button
            onClick={() => navigate('/games')}
            className="primary-button"
          >
            <FaDice /> <span>Play Games</span>
          </button>
          <button
            onClick={() => navigate('/players')}
            className="primary-button"
          >
            <FaUserEdit /> <span>Manage Players</span>
          </button>
          <IconDetail Icon={FaUsers} text={players.length} />
        </div>
      </main>
      <Footer leftText={"2025 eggames"} rightText={"v1.0.0"} />
    </div>
  );
}

export default HomePage;