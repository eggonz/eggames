import type { IconType } from 'react-icons';
import styles from './IconsButton.module.css';

interface IconsButtonProps {
  icons: IconType[]  // List of Fa* icons
  onClick: () => void
  color?: "red" | "green" | "blue" // Color of the button
  disabled?: boolean // Disable the button
  circle?: boolean // Circle button
}

export default function IconsButton({ icons, onClick, color = "blue", disabled = false, circle = false }: IconsButtonProps) {
  return (
    <button className={[styles.iconsButton, styles[color], circle? styles.circle : ''].join(' ')}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
      disabled={disabled}
    >
      {icons.map((Icon: IconType, index: number) => (
        <Icon key={index}/>
      ))}
    </button>
  )
}
