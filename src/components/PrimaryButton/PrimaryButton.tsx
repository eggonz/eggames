import type { IconType } from "react-icons"
import styles from './PrimaryButton.module.css'

interface MainButtonProps {
  Icon?: IconType
  text: string
  onClick: () => void
  disabled?: boolean
}

export default function PrimaryButton({ Icon, text, onClick, disabled = false }: MainButtonProps) {
  return (
    <button
      type="button"
      className={styles.primaryButton}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && (
        <Icon />
      )}
      <span>{text}</span>
    </button>
  )
}