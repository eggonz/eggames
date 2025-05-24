import type { IconType } from 'react-icons'
import styles from './IconDetail.module.css'

interface IconDetailProps {
  Icon: IconType
  text: string | number
  className?: string
}

export default function IconDetail({ Icon, text, className = ''}: IconDetailProps) {
  if (typeof text === 'number') {
    text = text.toString()
  }
  return (
    <div className={styles.iconDetail + ' ' + className}>
      <Icon />
      <span>{text}</span>
    </div>
  )
}