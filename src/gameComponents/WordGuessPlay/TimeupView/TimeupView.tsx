import { FaForward, FaLightbulb } from "react-icons/fa"
import IconCanvas from "../../../components/IconCanvas"
import MainUiButton from "../../../components/MainUiButton"
import styles from "./TimeupView.module.css"

interface TimeupViewProps {
  onClickGuessed: () => void
  onClickNext: () => void
}

export default function TimeupView({onClickGuessed, onClickNext}: TimeupViewProps) {
  return (
    <div className={styles.play}>
      <h2>Time's Up!</h2>
      <div className={styles.canvasContainer}>
        <IconCanvas/>
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