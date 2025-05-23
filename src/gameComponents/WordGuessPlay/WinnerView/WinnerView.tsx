import winnerImage from "../../../assets/winner.png"
import MainUiButton from "../../../components/MainUiButton"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { getWinnerTeam } from "../../../utils/teamOps"
import styles from "./WinnerView.module.css"

interface WinnerProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  onClickReset: () => void
}

export default function WinnerView({config, progress, onClickReset}: WinnerProps) {
  const winningTeam = getWinnerTeam(config, progress)
  const winner = config.teams[0] // TODO tmp: delete this
  if (!winner) {
    console.error("No winning team") // This should not happen
    return <div className={styles.play}>It's a tie!</div>
  }

  return (
    <div className={styles.play}>
      <h2>WINNER!</h2>
      <div className={styles.winnerCircleContainer}>
        <div className={styles.circle}>
        </div>
        <img src={winnerImage} alt="Winner Image"/>
      </div>
      <div className={styles.teamsContainer + ' ' + styles.narrowPlayersContainer}>
        <ul className={styles.teamList}>
          {winner.players.map((player, index) => (
            <li key={index}
                style={{backgroundColor: winner.color}}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      <MainUiButton
        text={"Start Over"}
        onClick={onClickReset}
        className={styles.mainGameButton + ' ' + styles.text}
      />
    </div>
  )
}