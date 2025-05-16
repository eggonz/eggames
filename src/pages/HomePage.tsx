import './HomePage.css';
import { useState } from 'react';
import { FaDice, FaShareAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header"
import IconDetail from "../components/IconDetail";
import PrimaryButton from "../components/PrimaryButton"
import type { Player } from "../types/Player";
import { getStoredPlayers } from "../utils/playersStorage";

function HomePage() {
  const navigate = useNavigate()
  const [players] = useState<Player[]>(getStoredPlayers())

  return (
    <div className="page">
      <Header leftBtn={{ icons: [FaShareAlt], navDst: '/share' }}
              title="eggames" />
      <main>
        <div className="home-menu-container">
          <PrimaryButton Icon={FaDice}
                         text={"Play Games"}
                         onClick={() => navigate('/games')} />
          <PrimaryButton Icon={FaUserEdit}
                         text={"Manage Players"}
                         onClick={() => navigate('/players')} />
          <IconDetail Icon={FaUsers}
                      text={players.length} />
        </div>
      </main>
      <Footer leftText={"2025 eggames"}
              rightText={"v1.0.0"} />
    </div>
  );
}

export default HomePage;