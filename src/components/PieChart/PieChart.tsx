import React from 'react';
import styles from './PieChart.module.css';

const PieChart: React.FC = () => {
  const radius = 100;
  const center = radius;
  const angle = 120;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z'
    ].join(' ');
  };

  const handleClick = (section: number) => {
    alert(`Clicked on section ${section}`);
  };

  return (
    <svg
      viewBox={`0 0 ${2 * radius} ${2 * radius}`}
      preserveAspectRatio="xMidYMid meet"
      className={styles.pieChart}
    >
      {[0, 1, 2].map(i => {
        const startAngle = i * angle;
        const endAngle = startAngle + angle;
        return (
          <path
            key={i}
            d={describeArc(startAngle, endAngle)}
            fill={['#f00', '#0f0', '#00f'][i]}
            onClick={() => handleClick(i + 1)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
