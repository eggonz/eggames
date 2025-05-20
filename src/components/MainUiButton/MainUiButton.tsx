import type { IconType } from "react-icons"
import styles from './MainUiButton.module.css'

interface ButtonProps {
  Icon?: IconType
  text: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function MainUiButton({ Icon, text, onClick, disabled = false, variant = 'primary', className = ''}: ButtonProps) {
  return (
    <button
      type="button"
      className={variant === 'primary' ? styles.primaryButton : styles.secondaryButton + ' ' + className}
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