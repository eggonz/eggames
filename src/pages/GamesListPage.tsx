import './GamesListPage.css';
import { useState } from 'react';
import { FaArrowLeft, FaUsers } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import GameCard from "../components/GameCard"
import Header from "../components/Header";
import IconDetail from "../components/IconDetail";
import { AVAILABLE_GAMES } from '../data/gameData';
import type { Player } from "../types/Player";
import { getStoredPlayers } from "../utils/playersStorage";

function GamesListPage() {
  const navigate = useNavigate();
  const [players] = useState<Player[]>(getStoredPlayers());

  return (
    <div className="page games-page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft],
          onClick: () => navigate('/'),
        }}
        title="Games"
        rightDiv={<IconDetail Icon={FaUsers} text={players.length} />}
      />
      <main>
        <div className="games-grid">
          {AVAILABLE_GAMES.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default GamesListPage;