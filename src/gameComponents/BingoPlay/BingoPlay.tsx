import React from "react"
import type { BingoConfig } from "../../types/GameConfig"
import type { BingoProgress } from "../../types/GameProgress"
import styles from './BingoPlay.module.css'

// Main Component
interface PlayProps {
  config: BingoConfig
  progress: BingoProgress
  setProgress: React.Dispatch<React.SetStateAction<BingoProgress>>
}

export default function BingoPlay({ config, progress, setProgress }: PlayProps) {

  const handleCellClick = (index: number) => {
    const newCheckedCells = [...progress.checkedPrompts]
    newCheckedCells[index] = !newCheckedCells[index]
    setProgress((prev: BingoProgress) => ({
      ...prev,
      checkedPrompts: newCheckedCells
    }))
  }

  return (
    <div className={styles.bingoPlay}>
      <h2>Bingo Game</h2>
      <div
        className={styles.bingoBoard}
        style={{
          gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
          gridTemplateRows: `repeat(${config.rows}, 1fr)`
        }}
      >
        {config.selectedPrompts.map((prompt, index) => (
          <div
            key={index}
            className={`${styles.bingoCell} ${progress.checkedPrompts[index] ? styles.checked : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {prompt}
          </div>
        ))}
      </div>
    </div>
  )
}