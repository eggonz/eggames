import './GamesListPage.css';
import { useState } from 'react';
import { FaArrowLeft, FaUsers } from 'react-icons/fa';
import GameCard from "../components/GameCard"
import { AVAILABLE_GAMES } from '../data/gameData';
import type { Player } from "../types/Player";
import { getStoredPlayers } from "../utils/playersStorage";
import Header from "../components/Header";
import IconDetail from "../components/IconDetail";

function GamesListPage() {
  const [players] = useState<Player[]>(getStoredPlayers());

  return (
    <div className="page games-page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft],
          navDst: '/',
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