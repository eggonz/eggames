import { FaForward } from "react-icons/fa"
import MainUiButton from "../../../components/MainUiButton"
import styles from "./NextView.module.css"

interface NextViewProps {
  onClickNext: () => void
}

export default function NextView({onClickNext}: NextViewProps) {
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