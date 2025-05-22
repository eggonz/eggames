import type { JSX } from "react"
import styles from './Header.module.css'

interface HeaderProps {
  title?: string
  left?: JSX.Element[]
  right?: JSX.Element[]
}

export default function Header({ title, left, right}: HeaderProps) {
  return (
    <header>
      {title && (
        <div className={styles.headerTitle}>
          <h1>{title}</h1>
        </div>
      )}
      <div className={styles.buttonPool + ' ' + styles.left}>
        {left && left.map((btn, index) => (
          <div key={index}>
            {btn}
          </div>
        ))}
      </div>
      <div className={styles.buttonPool + ' ' + styles.right}>
        {right && right.map((btn, index) => (
          <div key={index}>
            {btn}
          </div>
        ))}
      </div>
    </header>
  );
}