import './common.css';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';
import { FaStopwatch, FaUsers, FaExclamationCircle } from "react-icons/fa";
import type {GameIdType, Game} from '../data/gameData';

interface GameCardProps {
  key: GameIdType;
  game: Game;
}

function GameCard({ key, game }: GameCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div key={key} className="game-card" onClick={handleClick}>
      <h3>{game.name}</h3>
      <p className="game-card-details">
        <div className="icon-detail"><FaUsers className="icon"/> <span className="detail">{game.people}</span></div>
        {game.time && (
          <div className="icon-detail"><FaStopwatch className="icon"/> <span className="detail">{game.time}</span></div>
        )}
        {game.age && (
          <div className="icon-detail"><FaExclamationCircle className="icon" /> <span className="detail">Age {game.age}</span></div>
        )}
      </p>
      <p className="game-card-desc">{game.description}</p>
    </div>
  );
}

export default GameCard;