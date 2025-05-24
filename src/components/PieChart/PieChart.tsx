import type { IconType } from "react-icons"
import { FaLightbulb } from "react-icons/fa"
import styles from './PieChart.module.css'

interface PieChartProps {
  slices: number
  colors: string[]
  labels?: string[]
  onClick?: (slice: number) => void  // slice is 0-indexed
  selectedIdx?: number  // selected slice, 0-indexed
  Icon?: IconType // show icon in selected slice
}

function PieChart({ slices, colors, labels, onClick, selectedIdx, Icon }: PieChartProps) {
  const radius = 100
  const center = radius
  const angle = 360 / slices
  const textRadius = radius * 0.7

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle)
    const end = polarToCartesian(center, center, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z'
    ].join(' ')
  }

  const getLabelPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2
    return polarToCartesian(center, center, textRadius, midAngle)
  }

  return (
    <svg
      viewBox={`-2 -2 ${2 * radius + 4} ${2 * radius + 4}`}
      preserveAspectRatio="xMidYMid meet"
      className={styles.pieChart}
    >
      {Array.from({ length: slices }, (_, i) => {
        const startAngle = i * angle
        const endAngle = startAngle + angle
        const labelPos = getLabelPosition(startAngle, endAngle)
        const isSelected = selectedIdx === i

        return (
          <g key={i}>
            <path
              d={describeArc(startAngle, endAngle)}
              fill={colors[i] || '#ccc'}
              onClick={() => onClick? onClick(i) : undefined}
              style={{
                cursor: onClick? 'pointer' : 'default',
                opacity: isSelected ? 1 : 0.7,
                stroke: isSelected ? 'black' : 'none',
                strokeWidth: isSelected ? 2 : 0,
              }}
            />
            {labels && i < labels.length && (
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
              >
                {labels[i] || ''}
              </text>
            )}
            {Icon && i === selectedIdx && (
              <FaLightbulb
                x={labelPos.x - 10}
                y={labelPos.y - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default PieChart