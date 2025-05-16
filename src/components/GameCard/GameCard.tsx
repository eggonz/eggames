import styles from  './GameCard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaStopwatch, FaUsers } from "react-icons/fa";
import IconDetail from "../IconDetail";
import type { Game } from "../../types/Game";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div className={styles.gameCard} onClick={handleClick}>
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