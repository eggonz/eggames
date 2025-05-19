import type { IconType } from 'react-icons';
import styles from './HeaderNavBtn.module.css';

interface HeaderNavBtnProps {
  icons: IconType[]  // List of Fa* icons
  onCLick: () => void
  position: "left" | "right" // Position of the button
  color?: "red" | "green" | "blue" // Color of the button
  disabled?: boolean // Disable the button
}

export default function HeaderNavBtn({ icons, onCLick, position, color = "blue", disabled = false }: HeaderNavBtnProps) {
    return (
        <button className={[styles.headerNavBtn, styles[position], styles[color]].join(' ')}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onCLick()
            }}
            disabled={disabled}
        >
            {icons.map((Icon: IconType, index: number) => (
                <Icon key={index}/>
            ))}
        </button>
    )
}
