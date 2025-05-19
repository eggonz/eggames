import { FaExclamationCircle, FaStopwatch, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import type { Game } from "../../types/Game";
import IconDetail from "../IconDetail";
import styles from './GameCard.module.css';

export default function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate();

  return (
    <div className={styles.gameCard} onClick={() => navigate(`/game/${game.id}/new`)}>
      <h3>{game.name}</h3>
      <div className={styles.gameCardDetails}>
        <IconDetail Icon={FaUsers} text={game.people} />
        {game.time && <IconDetail Icon={FaStopwatch} text={game.time} /> }
        {game.age && <IconDetail Icon={FaExclamationCircle} text={`Age ${game.age}`} /> }
      </div>
      <div className={styles.gameCardDesc}><p>{game.description}</p></div>
    </div>
  );
}