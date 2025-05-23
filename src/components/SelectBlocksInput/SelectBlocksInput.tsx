import styles from './SelectBlocksInput.module.css'

interface Options {
  [key: string]: { value: number, label: string }
}

interface CounterInputProps {
  value: number
  options: Options
  onClick: (value: number) => void
}

export default function SelectBlocksInput({ value, options, onClick }: CounterInputProps) {
  return (
    <div className={styles.selectBlocks}>
      {Object.keys(options).map((key) => (
        <button
          key={options[key].value}
          type="button"
          className={styles.selectBlock + ' ' + (value === options[key].value ? styles.selected : '')}
          onClick={() => onClick(options[key].value)}
        >
          {options[key].label}
        </button>
      ))}
    </div>
  )
}