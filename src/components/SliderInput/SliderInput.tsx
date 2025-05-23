import React from "react"
import styles from './SliderInput.module.css'

interface CounterInputProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SliderInput({ value, min, max, step = 1, onChange }: CounterInputProps) {
  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
      <span className={styles.sliderLabel}>{value}</span>
    </div>
  )
}