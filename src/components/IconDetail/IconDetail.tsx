import type { IconType } from 'react-icons'
import styles from './IconDetail.module.css'

interface IconDetailProps {
  Icon: IconType
  text: string | number
}

export default function IconDetail({ Icon, text }: IconDetailProps) {
  if (typeof text === 'number') {
    text = text.toString()
  }
  return (
    <div className={styles.iconDetail}>
      <Icon />
      <span>{text}</span>
    </div>
  )
}