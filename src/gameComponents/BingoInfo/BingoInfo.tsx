import gridScreenshot from '../../assets/bingo-info-grid.png'
import poolScreenshot from '../../assets/bingo-info-pool.png'
import styles from './BingoInfo.module.css'

// Main Component
export default function BingoInfo() {
  return (
    <div className={styles.bingoInfo}>
      <div>
        <p>Welcome to the Bingo game!</p>
        <p>In this game, players will compete to complete a bingo card by marking off cells on the grid.</p>
        <p>You can customize the game in the settings page.
          You can change the size of the grid and the prompts for the cells.</p>
        <p>There are predefined packages of prompt available that can be imported and extended.
          Enter your own prompts in a new line of the prompt pool.</p>
      </div>
      <div>
        <img src={poolScreenshot} alt="Bingo Pool Screenshot" className={styles.infoImage} />
      </div>
      <div>
        <p>After your collection of prompts is complete, you can generate the bingo by selecting a subset of random
          prompts from the pool.</p>
        <p>Once the prompts for the bingo have been generated, the button to start the game at the top right corner
          will unlock.</p>
      </div>
      <div>
        <img src={gridScreenshot} alt="Bingo Grid Screenshot" className={styles.infoImage} />
      </div>
    </div>
  )
}