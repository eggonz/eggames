import type { JSX } from "react"
import styles from './CounterInput.module.css'

interface CounterInputProps {
  label: string | number
  labelLeft: string | number | JSX.Element
  labelRight: string | number | JSX.Element
  value: number
  min: number
  max: number
  onClick: (direction: -1 | 1) => void // -1 left, 1 right
}

export default function CounterInput({ label, labelLeft, labelRight, value, min, max, onClick }: CounterInputProps) {
  return (
    <div className={styles.counterContainer}>
      <button
        type="button"
        onClick={() => onClick(-1)}
        disabled={value <= min}
        className={styles.counterButton}
      >
        {labelLeft}
      </button>
      <span className={styles.counterDisplay}>{label}</span>
      <button
        type="button"
        onClick={() => onClick(1)}
        disabled={value >= max}
        className={styles.counterButton}
      >
        {labelRight}
      </button>
    </div>
  )
}