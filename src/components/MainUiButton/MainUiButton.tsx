import React from "react"
import type { IconType } from "react-icons"
import styles from './MainUiButton.module.css'

interface ButtonProps {
  Icon?: IconType
  text?: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
  style?: React.CSSProperties
}

export default function MainUiButton(
  {
    Icon,
    text,
    onClick,
    disabled = false,
    variant = 'primary',
    className = '',
    style = {},
  }: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        className,
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {Icon && (
        <Icon />
      )}
      {text && (
        <span>{text}</span>
      )}
    </button>
  )
}