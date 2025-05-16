import type { IconType } from "react-icons"
import styles from './PrimaryButton.module.css'

interface MainButtonProps {
  Icon?: IconType
  text: string
  onClick: () => void
}

export default function PrimaryButton({ Icon, text, onClick }: MainButtonProps) {
  return (
    <button
      className={styles.primaryButton}
      onClick={onClick}
    >
      {Icon && (
        <Icon />
      )}
      <span>{text}</span>
    </button>
  )
}