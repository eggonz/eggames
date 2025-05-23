import React, { useState } from "react"
import { FaCrown, FaForward, FaLightbulb, FaRedoAlt } from "react-icons/fa"
import winnerImage from '../../../assets/winner.png'
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { WordGuessProgress } from "../../../types/GameProgress"
import { Views } from "../../../utils/constants"
import { getWinnerTeam } from "../../../utils/teamOps"
import IconCanvas from "../../IconCanvas"
import IconDetail from "../../IconDetail"
import IconsButton from "../../IconsButton"
import MainUiButton from "../../MainUiButton"
import PieChart from "../../PieChart/PieChart"
import RotatingHourglass from "../../RotatingHourglass/RotatingHourglass"
import styles2 from "../WordGuess.module.css"
import styles from './WordGuessPlay.module.css'

// NEXT view

interface NextViewProps {
  onClickNext: () => void
}

function NextView({ onClickNext }: NextViewProps) {
  return (
    <div className={styles.play}>
      <h2>NEXT TURN</h2>
      <div className={styles.circleContainer}>
        <div className={styles.circle}>
          Egoitz
        </div>
      </div>
      <MainUiButton
        Icon={FaForward}
        onClick={onClickNext}
        className={styles.mainGameButton}
      />
    </div>
  )
}

// CARD view

enum CardViewButtonVariant {
  NEXT,
  GUESS,
} // TODO generalize to cardViewState: ready, running, finished

interface CardViewProps {
  variant: CardViewButtonVariant
  onClickCard: () => void
  onClickSkip: () => void
  onTimeUp: () => void
  onClickGuessed: () => void
  onClickNext: () => void
}

function CardView({ variant, onClickCard, onClickSkip, onTimeUp, onClickGuessed, onClickNext }: CardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    onClickCard()
  }

  return (
    <div className={styles.play}>
      <h2>TURN: Egoitz</h2>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
          onClick={handleCardClick}
        >
          <div className={`${styles.cardFace} ${styles.cardFront}`}>
            ?
          </div>
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            Secret Message
          </div>
        </div>
      </div>
      <div className={styles.timerContainer}>
        <IconDetail Icon={RotatingHourglass} text={"60:00"} />
        <IconsButton
          icons={[FaRedoAlt]}
          onClick={onClickSkip}
        />
      </div>
      {(() => { switch (variant) {
        case CardViewButtonVariant.NEXT:
          return <MainUiButton
            Icon={FaForward}
            onClick={onClickNext}
            className={styles.mainGameButton}
          />
        case CardViewButtonVariant.GUESS:
          return <MainUiButton
            Icon={FaLightbulb}
            onClick={onClickGuessed}
            className={styles.mainGameButton}
          />
      }})()}
    </div>
  )
}

// TIMEUP view

interface TimeupViewProps {
  onClickGuessed: () => void
  onClickNext: () => void
}

function TimeupView({ onClickGuessed, onClickNext }: TimeupViewProps) {
  return (
    <div className={styles.play}>
      <h2>Time's Up!</h2>
      <div className={styles.canvasContainer}>
        <IconCanvas />
      </div>
      <span className={styles.secretWord}>Secret word</span>
      <div className={styles.bottomButtons}>
        <MainUiButton
          Icon={FaLightbulb}
          onClick={onClickGuessed}
          className={styles.mainGameButton}
        />
        <MainUiButton
          Icon={FaForward}
          onClick={onClickNext}
          className={styles.mainGameButton}
        />
      </div>
    </div>
  )
}

// GUESSED view

interface GuessedViewProps {
  onClickNext: () => void
}

function GuessedView({ onClickNext }: GuessedViewProps) {
  return (
    <div className={styles.play}>
      <h2>Who guessed?</h2>
      <div className={styles.pieContainer}>
        <PieChart />
      </div>
      <MainUiButton
        Icon={FaForward}
        onClick={onClickNext}
        className={styles.mainGameButton}
      />
    </div>
  )
}

// POINTS view

enum PointsViewButtonVariant {
  NEXT,
  WINNER,
} // TODO generalize to cardViewState: ready, running, finished

interface PointsViewProps {
  variant: PointsViewButtonVariant
  onClickNext: () => void
  onClickWinner: () => void
}

function PointsView({ variant, onClickNext, onClickWinner }: PointsViewProps) {
  return (
    <div className={styles.play}>
      <h2>POINT COUNT</h2>
      <div className={styles.pieContainer}>
        <PieChart />
      </div>
      {(() => { switch (variant) {
        case PointsViewButtonVariant.NEXT:
          return <MainUiButton
            Icon={FaForward}
            onClick={onClickNext}
            className={styles.mainGameButton}
          />
        case PointsViewButtonVariant.WINNER:
          return <MainUiButton
            Icon={FaCrown}
            onClick={onClickWinner}
            className={styles.mainGameButton}
          />
      }})()}
    </div>
  )
}

// WINNER view

interface WinnerProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  onClickReset: () => void
}

function WinnerView({ config, progress, onClickReset }: WinnerProps) {
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
        <img src={winnerImage} alt="Winner Image" />
      </div>
      <div className={styles2.teamsContainer + ' ' + styles.narrowPlayersContainer}>
        <ul className={styles2.teamList}>
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

// Main Component

interface PlayProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
}

export default function WordGuessPlay({ config, progress, setProgress }: PlayProps) {
  const [view, setView] = useState(Views.WINNER)

  // TODO view is restarted (not saved) when we navigate back from info/settings

  switch (view) {
    case Views.NEXT:
      return <NextView
        onClickNext={() => setView(Views.CARD)}
      />
    case Views.CARD:
      return <CardView
        variant={CardViewButtonVariant.GUESS}
        onClickCard={() => {}} // TODO
        onClickSkip={() => {}} // TODO
        onTimeUp={() => {}} // TODO
        onClickGuessed={() => setView(Views.GUESSED)}
        onClickNext={() => setView(Views.TIMEUP)}
      />
    case Views.TIMEUP:
      return <TimeupView
        onClickGuessed={() => setView(Views.GUESSED)}
        onClickNext={() => setView(Views.POINTS)}
      />
    case Views.GUESSED:
      return <GuessedView
        onClickNext={() => setView(Views.POINTS)}
      />
    case Views.POINTS:
      return <PointsView
        variant={PointsViewButtonVariant.WINNER} // TODO
        onClickNext={() => setView(Views.NEXT)}
        onClickWinner={() => setView(Views.WINNER)}
      />
    case Views.WINNER:
      return <WinnerView
        config={config}
        progress={progress}
        onClickReset={() => setView(Views.NEXT)} // TODO back to /new/info
      />
    default:
      return null
  }
}