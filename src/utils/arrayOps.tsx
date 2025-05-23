function shuffle<T>(array: T[]): T[] {
  const out_array = [...array]
  let j
  let temp
  for (let i = out_array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = out_array[i]
    out_array[i] = out_array[j]
    out_array[j] = temp
  }
  return out_array
}

export { shuffle }