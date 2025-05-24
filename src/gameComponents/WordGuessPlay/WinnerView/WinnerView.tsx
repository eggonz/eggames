import winnerImage from "../../../assets/winner.png"
import MainUiButton from "../../../components/MainUiButton"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { getWinnerTeam } from "../../../utils/teamOps"
import styles from "./WinnerView.module.css"

interface WinnerProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  onClickRestart: () => void
}

export default function WinnerView({ config, progress, onClickRestart }: WinnerProps) {

  const winningTeam = getWinnerTeam(config, progress)

  if (!winningTeam) {
    console.error("No winning team") // This should not happen
    return <div className={styles.play}>It's a tie!</div>
  }

  const gradient = `radial-gradient(circle at center, 
    ${winningTeam.color.primary} 0%, 
    ${winningTeam.color.primary} 50%, 
    ${winningTeam.color.secondary} 100%
  )`

  return (
    <div className={styles.play}>
      <h2>WINNER!</h2>
      <div className={styles.winnerCircleContainer}>
        <div className={styles.circle} style={{ backgroundImage: gradient }}>
        </div>
        <img src={winnerImage} alt="Winner Image"/>
      </div>
      <div className={[styles.teamsContainer, styles.winnerPlayersContainer].join(' ')}>
        <ul className={styles.teamList}>
          {winningTeam.players.map((player, index) => (
            <li key={index}
                style={{backgroundColor: winningTeam.color.soft}}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      <MainUiButton
        text={"Start Over"}
        onClick={onClickRestart}
        className={styles.mainGameButton + ' ' + styles.text}
      />
    </div>
  )
}