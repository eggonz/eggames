import { useState } from "react"
import { FaForward, FaLightbulb, FaRedoAlt } from "react-icons/fa"
import IconDetail from "../../../components/IconDetail"
import IconsButton from "../../../components/IconsButton"
import MainUiButton from "../../../components/MainUiButton"
import RotatingHourglass from "../../../components/RotatingHourglass"
import styles from "./CardView.module.css"

export enum CardViewButtonVariant {
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

export default function CardView({variant, onClickCard, onClickSkip, onTimeUp, onClickGuessed, onClickNext}: CardViewProps) {
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
        <IconDetail Icon={RotatingHourglass} text={"60:00"}/>
        <IconsButton
          icons={[FaRedoAlt]}
          onClick={onClickSkip}
        />
      </div>
      {(() => {
        switch (variant) {
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
        }
      })()}
    </div>
  )
}