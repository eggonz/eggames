import React, { useId } from "react"
import styles from './ToggleInput.module.css'

interface CounterInputProps {
  isChecked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ToggleInput({ isChecked, onChange }: CounterInputProps) {
  const toggleId = useId()
  return (
    <div className={styles.toggleSwitch}>
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={onChange}
        className={styles.toggleInput}
      />
      <label className={styles.toggleLabel} htmlFor={toggleId}>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  )
}