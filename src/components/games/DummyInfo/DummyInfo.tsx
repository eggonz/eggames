import styles from './DummyInfo.module.css'

// Main Component
export default function DummyInfo() {
  return (
    <div className={styles.dummyInfo}>
      <h2>Dummy Info</h2>
      <div>
        this is a description of the game
      </div>
    </div>
  )
}