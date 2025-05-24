import wordData from './word-guess.json'

export interface WordEntry {
  word: string
  tag: string | null
}

export default class WordLoader<T=WordEntry> {
  private readonly data: T[]

  constructor() {
    this.data = wordData as T[]
  }

  getRandom(): T {
    const randomIndex = Math.floor(Math.random() * this.data.length)
    return this.data[randomIndex]
  }

  getAll(): T[] {
    return this.data
  }
}