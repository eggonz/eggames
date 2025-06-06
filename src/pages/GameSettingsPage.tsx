import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaCheck, FaPlay, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import IconsButton from "../components/IconsButton"
import './GamePage.css'
import { getDefaultConfig } from "../constants/defaultConfigProgress"
import { LOADING } from "../constants/elements"
import useValidatedGame from "../hooks/useValidatedGame"
import type { GameConfig } from "../types/GameConfig"
import { clearStoredProgress, getStoredConfig, storeConfig } from "../utils/gameStorage"
import { getSettingsContent } from "../utils/gameContentSelector"
import ErrorPage from "./ErrorPage"

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

  const handleReturn = () => isNew? navigate(`/game/${game.id}/new/info`) : navigate(`/game/${game.id}/play`)

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

    const confirmOverwrite = window.confirm("Are you sure you want to overwrite the current settings,\nlose your game progress and start again?")
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
        left={[
          <IconsButton icons={[FaArrowLeft]}
                       onClick={handleReturn} />
        ]}
        title={game.name}
        right={[
          <IconsButton icons={[FaPlay]}
                       onClick={handleStart}
                       disabled={!configured}/>
        ]}
      />
    }
    return <Header
      left={[
        <IconsButton icons={[FaTimes]}
                     onClick={handleReturn}
                     color={"red"} />
      ]}
      title={game.name}
      right={[
        <IconsButton icons={[FaCheck]}
                     onClick={handleSave}
                     color={"green"}
                     disabled={!configured} />
      ]}
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
            {getSettingsContent(
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