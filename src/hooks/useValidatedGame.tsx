import { useParams } from 'react-router-dom'
import { getGameById } from '../data/gameData'
import type { Game } from "../types/Game"

type ValidatedGame = { game: Game, isValid: true } | { game: null, isValid: false }

// Hook
export default function useValidatedGame(): ValidatedGame {
  const { gameId } = useParams<{ gameId: string }>()
  if (!gameId) return { game: null, isValid: false }
  const game = getGameById(gameId)
  if (!game) return { game: null, isValid: false }
  return { game, isValid: true }
}