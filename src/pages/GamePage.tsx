import React, { useState } from "react"
import { FaArrowLeft, FaCog, FaDice } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import WordGuessPlay from "../components/games/WordGuessPlay"
import WordGuessSettings from "../components/games/WordGuessSettings"
import Header from "../components/Header"
import PrimaryButton from "../components/PrimaryButton"
import { getGameById } from "../data/gameData"
import type { WordGuessConfig } from "../types/WordGuessConfig"
import './GamePage.css'

// Constants
const NOT_FOUND = <div>Game not found</div>
const NOT_IMPLEMENTED = <div>Game not implemented</div>
const VALID_VIEWS = ['play', 'settings'] as const
const DEFAULT_CONFIG: WordGuessConfig = {
  difficulty: 0
}

// Components
interface SettingsProps {
  gameId: string
  config: WordGuessConfig
  setConfig: React.Dispatch<React.SetStateAction<WordGuessConfig>>
}

function SettingsMain({ gameId, config, setConfig }: SettingsProps) {
  const navigate = useNavigate()

  const renderContent = () => {
    switch (gameId) {
      case 'word-guess':
        return <WordGuessSettings config={config} setConfig={setConfig} />
      default:
        return NOT_IMPLEMENTED
    }
  }

  const handleStartGame = () => {
    navigate(`/game/${gameId}/play`, {
      state: {
        config: {
          ...config,
          // Add any other game-specific config here
        }
      }
    })
  }

  return (
    <div className="game-page settings">
      <div className="settings-container">
        <h2>Settings</h2>
        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
      <div className="start-button-container">
        <PrimaryButton text={"Start Game"}
                       onClick={handleStartGame} />
      </div>
    </div>
  )
}

interface PlayProps {
  gameId: string
  config: WordGuessConfig
}

function PlayMain({ gameId, config }: PlayProps) {
  const renderContent = () => {
    switch (gameId) {
      case 'word-guess':
        return <WordGuessPlay config={config} />
      default:
        return NOT_IMPLEMENTED
    }
  }

  return (
    <div className="game-page play">
      {renderContent()}
    </div>
  )
}

// Main Component
export default function GamePage() {
  const { gameId, view } = useParams()
  const [config, setConfig] = useState<WordGuessConfig>(DEFAULT_CONFIG)

  if (!gameId || !view || !VALID_VIEWS.includes(view as typeof VALID_VIEWS[number])) {
    return NOT_FOUND
  }
  const game = getGameById(gameId)
  if (!game) {
    return NOT_FOUND
  }

  return (
    <div className="page">
      {view === 'play' && (
        <Header
          leftBtn={{
            icons: [FaArrowLeft, FaDice],
            navDst: '/games',
          }}
          title={game.name}
          rightBtn={{
            icons: [FaCog],
            navDst: `/game/${gameId}/settings`,
          }}
        />
      )}
      {view === 'settings' && (
        <Header
          leftBtn={{
            icons: [FaArrowLeft],
            navDst: -1,
          }}
          title={game.name}
        />
      )}
      <main>
        {view === 'play' ?
          <PlayMain gameId={gameId} config={config} /> :
          <SettingsMain gameId={gameId} config={config} setConfig={setConfig} />
        }
      </main>
    </div>
  )
}