import type { WordEntry } from "../data/WordLoader"

export function formatSecret(wordEntry: WordEntry) {
  const { word, tag } = wordEntry
  return tag ? `${word}\n[${tag}]` : word
}