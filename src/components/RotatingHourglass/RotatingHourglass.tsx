import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaHourglassEnd, FaHourglassHalf } from "react-icons/fa"
import styles from './RotatingHourglass.module.css'

const icons = [
  { component: <FaHourglassEnd />, rotation: 0 },
  { component: <FaHourglassEnd />, rotation: 180 },
  { component: <FaHourglassHalf />, rotation: 0 },
]

export default function RotatingHourglass() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length)
    }, 1000) // change every second
    return () => clearInterval(interval)
  }, [])

  const currentIcon = icons[index]

  return (
    <div>
      <motion.div
        key={index}
        initial={{ rotate: 0 }}
        animate={{ rotate: currentIcon.rotation }}
        exit={{}}
        transition={{ duration: 0.5 }}
        // style={{ fontSize: 48 }}
        className={styles.iconMotion}
      >
        {currentIcon.component}
      </motion.div>
    </div>
  )
}