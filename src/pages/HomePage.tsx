import './HomePage.css';
import { useState } from 'react';
import { FaDice, FaShareAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header"
import IconDetail from "../components/IconDetail";
import IconsButton from "../components/IconsButton"
import MainUiButton from "../components/MainUiButton"
import type { Player } from "../types/Player";
import { getStoredPlayers } from "../utils/playersStorage";

function HomePage() {
  const navigate = useNavigate()
  const [players] = useState<Player[]>(getStoredPlayers())

  return (
    <div className="page">
      <Header
        left={[
          <IconsButton icons={[FaShareAlt]}
                       onClick={() => navigate('/share')} />
        ]}
        title={__APP_NAME__}
      />
      <main>
        <div className="home-menu-container">
          <MainUiButton Icon={FaDice}
                        text={"Play Games"}
                        onClick={() => navigate('/games')} />
          <div className="home-menu-players-group">
            <MainUiButton Icon={FaUserEdit}
                          text={"Manage Players"}
                          onClick={() => navigate('/players')} />
            <IconDetail Icon={FaUsers}
                        text={players.length} />
          </div>
        </div>
      </main>
      <Footer leftText={`2025 ${__APP_NAME__}`}
              rightText={`v${__APP_VERSION__}`} />
    </div>
  );
}

export default HomePage;