import styles from './BingoInfo.module.css'

// Main Component
export default function BingoInfo() {
  return (
    <div className={styles.bingoInfo}>
      <h2>Bingo Info</h2>
      <div>
        this is a description of the game
      </div>
    </div>
  )
}