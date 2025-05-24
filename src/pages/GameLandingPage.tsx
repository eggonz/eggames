import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EMPTY } from "../constants/elements"
import useValidatedGame from "../hooks/useValidatedGame"
import { clearStoredConfig, clearStoredProgress, getStoredConfig } from "../utils/gameStorage"
import ErrorPage from "./ErrorPage"

// Main Component
export default function GameLandingPage() {
  const navigate = useNavigate()
  const { game, isValid } = useValidatedGame()

  useEffect(() => {
    if (!isValid) return

    // Check existing save data
    if (getStoredConfig(game.id)) {
      if (window.confirm("Saved game data found. Do you want to resume?")) {
        // Resume game
        navigate(`/game/${game.id}/play`)
        return
      } else {
        // Clear existing save data
        clearStoredConfig(game.id)
        clearStoredProgress(game.id)
      }
    }

    // Start new game
    navigate(`/game/${game.id}/new/info`)
  }, [game, isValid, navigate])

  // Render

  if (!isValid) return <ErrorPage code={404} />
  return EMPTY
}