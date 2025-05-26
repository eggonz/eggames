import { FaExclamationCircle, FaSave, FaStopwatch, FaUsers } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import type { Game } from "../../types/Game"
import { clearStoredConfig, clearStoredProgress, getStoredConfig } from "../../utils/gameStorage"
import { getStoredPlayers } from "../../utils/playersStorage"
import IconDetail from "../IconDetail"
import styles from './GameCard.module.css'

export default function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate()
  const hasData = !!getStoredConfig(game.id)
  const numPlayers = getStoredPlayers().length
  const meetsPlayerRequirement = !game.minPeople || numPlayers >= game.minPeople

  const handleClick = () => {
    // Check if game has minimum player requirement
    if (!meetsPlayerRequirement) {
      alert(`This game requires at least ${game.minPeople} players.\nYou currently have ${numPlayers} player${numPlayers !== 1 ? 's' : ''}.`)
      return
    }

    // Check existing save data
    if (getStoredConfig(game.id)) {
      if (window.confirm("Saved game data found.\nDo you want to resume?")) {
        // Resume game
        navigate(`/game/${game.id}/play`)
        return
      }
      if (!window.confirm("Are you sure you want to delete saved data?")) return
      // Clear existing save data
      clearStoredConfig(game.id)
      clearStoredProgress(game.id)
    }

    // Start new game
    navigate(`/game/${game.id}/new/info`)
  }

  return (
    <div className={styles.gameCard} onClick={handleClick}>
      <div className={styles.titleContainer}>
        <h3>{game.name}</h3>
        {hasData && <FaSave />}
      </div>
      {(game.peopleLabel || game.timeLabel || game.ageLabel) &&
        <div className={styles.gameCardDetails}>
          {game.peopleLabel && <IconDetail Icon={FaUsers} text={game.peopleLabel} className={meetsPlayerRequirement ? '' : styles.forbiddenPeople} />}
          {game.timeLabel && <IconDetail Icon={FaStopwatch} text={game.timeLabel} />}
          {game.ageLabel && <IconDetail Icon={FaExclamationCircle} text={`Age ${game.ageLabel}`} />}
        </div>
      }
      <div className={styles.gameCardDesc}><p>{game.description}</p></div>
    </div>
  )
}