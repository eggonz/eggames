import { FaCrown, FaForward } from "react-icons/fa"
import MainUiButton from "../../../components/MainUiButton"
import PieChart from "../../../components/PieChart"
import styles from "./PointsView.module.css"

export enum PointsViewButtonVariant {
  NEXT,
  WINNER,
} // TODO generalize to cardViewState: ready, running, finished
interface PointsViewProps {
  variant: PointsViewButtonVariant
  onClickNext: () => void
  onClickWinner: () => void
}

export default function PointsView({variant, onClickNext, onClickWinner}: PointsViewProps) {
  return (
    <div className={styles.play}>
      <h2>POINT COUNT</h2>
      <div className={styles.pieContainer}>
        <PieChart/>
      </div>
      {(() => {
        switch (variant) {
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
        }
      })()}
    </div>
  )
}