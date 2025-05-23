import { FaForward } from "react-icons/fa"
import MainUiButton from "../../../components/MainUiButton"
import PieChart from "../../../components/PieChart"
import styles from "./GuessedView.module.css"

interface GuessedViewProps {
  onClickNext: () => void
}

export default function GuessedView({onClickNext}: GuessedViewProps) {
  return (
    <div className={styles.play}>
      <h2>Who guessed?</h2>
      <div className={styles.pieContainer}>
        <PieChart/>
      </div>
      <MainUiButton
        Icon={FaForward}
        onClick={onClickNext}
        className={styles.mainGameButton}
      />
    </div>
  )
}