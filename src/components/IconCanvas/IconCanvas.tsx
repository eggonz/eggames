import { FaSadTear, FaHourglass, FaExclamation } from 'react-icons/fa'
import styles from './IconCanvas.module.css'

interface IconPosition {
  Icon: typeof FaSadTear | typeof FaHourglass | typeof FaExclamation
  x: number
  y: number
  size?: number
  rotation?: number
}

const ICONS: IconPosition[] = [
  { Icon: FaSadTear, x: 195, y: 210, size: 140, rotation: 10 },
  { Icon: FaHourglass, x: 80, y: 110, size: 110, rotation: -20 },
  { Icon: FaExclamation, x: 180, y: 65, size: 100, rotation: 0},
  { Icon: FaExclamation, x: 230, y: 70, size: 100, rotation: 10 },
]

export default function IconCanvas() {
  return (
    <div className={styles.canvas}>
      {ICONS.map((icon, index) => (
        <div
          key={index}
          className={styles.iconWrapper}
          style={{
            left: icon.x,
            top: icon.y,
            transform: `translate(-50%, -50%) rotate(${icon.rotation || 0}deg)`
          }}
        >
          <icon.Icon size={icon.size} />
        </div>
      ))}
    </div>
  )
}