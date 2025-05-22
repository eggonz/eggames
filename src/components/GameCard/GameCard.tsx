import { FaExclamationCircle, FaSave, FaStopwatch, FaUsers } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import type { Game } from "../../types/Game"
import { getStoredConfig } from "../../utils/gameStorage"
import IconDetail from "../IconDetail"
import styles from './GameCard.module.css'

export default function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate()
  const hasData = !!getStoredConfig(game.id)

  return (
    <div className={styles.gameCard} onClick={() => navigate(`/game/${game.id}`)}>
      <div className={styles.titleContainer}>
        <h3>{game.name}</h3>
        {hasData && <FaSave />}
      </div>
      <div className={styles.gameCardDetails}>
        <IconDetail Icon={FaUsers} text={game.people} />
        {game.time && <IconDetail Icon={FaStopwatch} text={game.time} /> }
        {game.age && <IconDetail Icon={FaExclamationCircle} text={`Age ${game.age}`} /> }
      </div>
      <div className={styles.gameCardDesc}><p>{game.description}</p></div>
    </div>
  )
}