import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaCog, FaDice } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import BingoPlay from "../components/games/BingoPlay"
import DummyPlay from "../components/games/DummyPlay"
import WordGuessPlay from "../components/games/WordGuessPlay"
import Header from "../components/Header"
import { getDefaultProgress } from "../data/defaultConfigs"
import useValidatedGame from "../hooks/useValidatedGame"
import {
  type BingoConfig,
  type BingoProgress,
  type DummyConfig,
  type GameConfig,
  GameProgress,
  type WordGuessConfig
} from "../types/GameConfig"
import { getStoredConfig, getStoredProgress, storeProgress } from "../utils/gameStorage"
import ErrorPage from "./ErrorPage"

const NOT_IMPLEMENTED = <div>Game not implemented</div>
const LOADING = <div>Loading...</div>

function renderView(
  gameId: string,
  config: GameConfig,
  progress: GameProgress,
  setProgress: React.Dispatch<React.SetStateAction<GameProgress>>
) {
  switch (gameId) {
    case 'bingo':
      return <BingoPlay config={config as BingoConfig}
                        progress={progress as BingoProgress}
                        setProgress={setProgress as React.Dispatch<React.SetStateAction<BingoProgress>>} />
    case 'dummy':
      return <DummyPlay config={config as DummyConfig} />
    case 'word-guess':
      return <WordGuessPlay config={config as WordGuessConfig} />
    default:
      return NOT_IMPLEMENTED
  }
}

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
        leftBtn={{
          icons: [FaArrowLeft, FaDice],
          onClick: handleExit,
        }}
        title={game.name}
        rightBtn={{
          icons: [FaCog],
          onClick: handleSettings,
        }}
      />
      <main>
        <div className="game-page play">
          <button onClick={handleInfo}>Info</button> {/* TODO add to header */}
          {renderView(
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