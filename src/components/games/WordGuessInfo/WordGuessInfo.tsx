import styles from './WordGuessInfo.module.css'

// Main Component
export default function WordGuessInfo() {
  return (
    <div className={styles.info}>
      <h2>How to Play</h2>
      <div className={styles.content}>
        <p>You can play this game as pictionary or charades. Choose to draw or act.</p>
        <ol className={styles.list}>
          <li>First, teams are created.</li>
          <li>In each turn, a different team plays, rotating. Within each team, players also rotate.</li>
          <li>During your turn:</li>
          <ol className={styles.sublist}>
            <li>You get a card with a secret word in the back.</li>
            <li>Only you are allowed to see the secret word.</li>
            <li>When you flip the card and unveil the secret word, timer starts.</li>
            <li>You need to draw/act the secret word in front of everyone for them to guess.</li>
            <li>It is not allowed to speak or write characters.</li>
            <li>The turn finishes when the time is up or somebody guesses.</li>
          </ol>
          <li>Whoever guesses wins a point for their team.</li>
          <li>If timer reaches the end, nobody wins the point this turn.</li>
          <li>Before starting, you will decide the number of points to win.</li>
          <li>The team that gets the chosen score first, wins.</li>
        </ol>
        <p>Optional: A player can skip up to 2 words in their turn.</p>
      </div>
    </div>
  )
}