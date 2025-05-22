import { useEffect, useState } from "react"
import { FaArrowLeft, FaCog, FaDice, FaInfo } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import IconsButton from "../components/IconsButton"
import { getDefaultProgress } from "../data/defaultConfigProgress"
import { LOADING } from "../utils/constantElements"
import useValidatedGame from "../hooks/useValidatedGame"
import type { GameProgress } from "../types/GameProgress"
import { getStoredConfig, getStoredProgress, storeProgress } from "../utils/gameStorage"
import { getPlayView } from "../utils/gameViewSelector"
import ErrorPage from "./ErrorPage"

// Main Component
export default function GamePlayPage() {
  const navigate = useNavigate()
  const { game, isValid } = useValidatedGame()
  const [progress, setProgress] = useState<GameProgress>()

  useEffect(() => {
    if (!isValid) return
    setProgress(getStoredProgress(game.id) || getDefaultProgress(game.id))
  }, [game, isValid])

  useEffect(() => {
    // Update storage on every change
    if (!isValid) return
    if (!progress) return
    storeProgress(game.id, progress)
  }, [game, isValid, progress])

  // Render

  if (!isValid) return <ErrorPage code={404} />

  const handleExit = () => {
    const confirmLeave = window.confirm('Are you sure you want to leave the game? Your current progress will be saved.')
    if (!confirmLeave) return

    // clearStoredConfig(game.id)
    // clearStoredProgress(game.id)
    navigate('/games')
  }

  const handleInfo = () => navigate(`/game/${game.id}/info`)

  const handleSettings = () => navigate(`/game/${game.id}/settings`)

  const config = getStoredConfig(game.id)
  if (!config) {
    console.error(`Game ${game.id} has no config`)
    return <ErrorPage code={500} />
  }

  if (!progress) return LOADING
  return (
    <div className="page">
      <Header
        left={[
          <IconsButton icons={[FaArrowLeft, FaDice]}
                       onClick={handleExit} />
        ]}
        title={game.name}
        right={[
          <IconsButton icons={[FaInfo]}
                       onClick={handleInfo}
                       circle={true}/>,
          <IconsButton icons={[FaCog]}
                       onClick={handleSettings} />
        ]}
      />
      <main>
        <div className="game-page play">
          {getPlayView(
            game.id,
            config,
            progress,
            setProgress
          )}
        </div>
      </main>
    </div>
  )
}