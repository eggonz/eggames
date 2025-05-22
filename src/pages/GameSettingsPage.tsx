import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaCheck, FaPlay, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import BingoSettings from "../components/games/BingoSettings"
import DummySettings from "../components/games/DummySettings"
import WordGuessSettings from "../components/games/WordGuessSettings"
import Header from "../components/Header"
import { getDefaultConfig } from "../data/defaultConfigs"
import './GameSettingsPage.css'
import useValidatedGame from "../hooks/useValidatedGame"
import type { BingoConfig, DummyConfig, GameConfig, WordGuessConfig } from "../types/GameConfig"
import { clearStoredProgress, getStoredConfig, storeConfig } from "../utils/gameStorage"
import ErrorPage from "./ErrorPage"

const NOT_IMPLEMENTED = <div>Game not implemented</div>
const LOADING = <div>Loading...</div>

function renderForm(gameId: string,
                    config: GameConfig,
                    setConfig: React.Dispatch<React.SetStateAction<GameConfig>>,
                    setConfigured: React.Dispatch<React.SetStateAction<boolean>>) {
  switch (gameId) {
    case 'bingo':
      return <BingoSettings config={config as BingoConfig}
                            setConfig={setConfig as React.Dispatch<React.SetStateAction<BingoConfig>>}
                            setConfigured={setConfigured} />
    case 'dummy':
      return <DummySettings config={config as DummyConfig}
                            setConfig={setConfig as React.Dispatch<React.SetStateAction<DummyConfig>>} />
    case 'word-guess':
      return <WordGuessSettings config={config as WordGuessConfig}
                                setConfig={setConfig as React.Dispatch<React.SetStateAction<WordGuessConfig>>} />
    default:
      return NOT_IMPLEMENTED
  }
}

// Main Component
export default function GameSettingsPage({ isNew = false }: { isNew?: boolean }) {
  const navigate = useNavigate()
  const { game, isValid } = useValidatedGame()
  const [configured, setConfigured] = useState(false)
  const [initialConfig, setInitialConfig] = useState<GameConfig>()
  const [tmpConfig, setTmpConfig] = useState<GameConfig>()

  useEffect(() => {
    if (!isValid) return
    setInitialConfig(isNew ? getDefaultConfig(game.id) : getStoredConfig(game.id) || getDefaultConfig(game.id))
  }, [game, isNew, isValid])

  useEffect(() => {
    if (!initialConfig) return
    setTmpConfig(initialConfig)
  }, [initialConfig])

  // Render

  if (!isValid) return <ErrorPage code={404} />

  const handleReturn = () => navigate(-1)

  const handleStart = () => {
    if (!configured || !tmpConfig) return

    // Store config
    storeConfig(game.id, tmpConfig)

    navigate(`/game/${game.id}/play`)
  }

  const handleSave = () => {
    if (!configured || !tmpConfig) return

    const changed = JSON.stringify(tmpConfig) !== JSON.stringify(initialConfig)
    if (!changed) {
      // No changes, just return
      navigate(-1)
      return
    }

    const confirmOverwrite = window.confirm("Are you sure you want to overwrite the current settings, lose your game progress and start again?")
    if (!confirmOverwrite) return

    // Clear progress
    clearStoredProgress(game.id)

    // Store config
    storeConfig(game.id, tmpConfig)

    navigate(`/game/${game.id}/play`)
  }

  const renderHeader = () => {
    if (isNew) {
      return <Header
        leftBtn={{
          icons: [FaArrowLeft],
          onClick: handleReturn,
        }}
        title={game.name}
        rightBtn={{
          icons: [FaPlay],
          onClick: handleStart,
          disabled: !configured,
        }}
      />
    }
    return <Header
      leftBtn={{
        icons: [FaTimes],
        onClick: handleReturn,
        color: 'red',
      }}
      title={game.name}
      rightBtn={{
        icons: [FaCheck],
        onClick: handleSave,
        color: 'green',
        disabled: !configured,
      }}
    />
  }

  if (!tmpConfig) return LOADING
  return (
    <div className="page">
      {renderHeader()}
      <main>
        <div className="game-page settings">
          <h2>Settings</h2>
          <div className="settings-content">
            {renderForm(
              game.id,
              tmpConfig,
              setTmpConfig as React.Dispatch<React.SetStateAction<GameConfig>>,
              setConfigured
            )}
          </div>
        </div>
      </main>
    </div>
  )
}