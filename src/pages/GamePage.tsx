import React, { useCallback, useEffect, useState } from "react"
import { FaArrowLeft, FaCog, FaDice } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import DummyPlay from "../components/games/DummyPlay"
import DummySettings from "../components/games/DummySettings"
import WordGuessPlay from "../components/games/WordGuessPlay"
import WordGuessSettings from "../components/games/WordGuessSettings"
import Header from "../components/Header"
import PrimaryButton from "../components/PrimaryButton"
import { getGameById } from "../data/gameData"
import { DEFAULT_DUMMY_CONFIG, type DummyConfig } from "../types/DummyConfig"
import type { Game } from "../types/Game"
import { DEFAULT_WORD_GUESS_CONFIG, type WordGuessConfig } from "../types/WordGuessConfig"
import './GamePage.css'

// Types
type GameConfig = DummyConfig | WordGuessConfig // implemented games

// Constants
const NOT_IMPLEMENTED = <div>Game not implemented</div>
const VALID_VIEWS = ['play', 'settings'] as const
const VALID_GAME_IDS = ['dummy', 'word-guess'] as const // implemented games

// Components
interface SettingsProps {
  gameId: string
  config: GameConfig
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>
}

function SettingsMain({ gameId, config, setConfig }: SettingsProps) {
  const navigate = useNavigate()

  const renderContent = () => {
    switch (gameId) {
      case 'word-guess':
        return <WordGuessSettings config={config as WordGuessConfig}
                                  setConfig={setConfig as React.Dispatch<React.SetStateAction<WordGuessConfig>>} />
      case 'dummy':
        return <DummySettings config={config as DummyConfig}
                              setConfig={setConfig as React.Dispatch<React.SetStateAction<DummyConfig>>} />
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
      <h2>Settings</h2>
      <div className="settings-content">
        {renderContent()}
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
  config: GameConfig
}

function PlayMain({ gameId, config }: PlayProps) {
  const renderContent = () => {
    switch (gameId) {
      case 'word-guess':
        return <WordGuessPlay config={config as WordGuessConfig} />
      case 'dummy':
        return <DummyPlay config={config as DummyConfig} />
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
interface GamePageProps {
  game: Game
  view: string
}
function GamePage({ game, view }: GamePageProps) {

  const initConfig = useCallback((id: string): GameConfig => {
    switch (id) {
      case 'word-guess':
        return DEFAULT_WORD_GUESS_CONFIG
      case 'dummy':
        return DEFAULT_DUMMY_CONFIG
      default:
        return DEFAULT_DUMMY_CONFIG // ignored later
    }
  }, [])

  const [config, setConfig] = useState<GameConfig>(() => initConfig(game.id as string))

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
            navDst: `/game/${game.id}/settings`,
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
          <PlayMain gameId={game.id} config={config} /> :
          <SettingsMain gameId={game.id} config={config} setConfig={setConfig} />
        }
      </main>
    </div>
  )
}

// wrap GamePage with fallback for invalid gameId or view
export default function GamePageWithFallback() {
  const { gameId, view } = useParams()
  const [status, setStatus] = useState('loading') // loading, error, success

  useEffect(() => {
    if (!gameId || !view || !VALID_VIEWS.includes(view as typeof VALID_VIEWS[number])) {
      setStatus('error')
      return
    }

    const game = getGameById(gameId)
    if (!game || !VALID_GAME_IDS.includes(gameId as typeof VALID_GAME_IDS[number])) {
      setStatus('error')
      return
    }

    setStatus('success')
  }, [gameId, view])

  if (status === 'loading') {
    return <div className="loading">Loading...</div>
  } else if (status === 'error') {
    return <div className="error">Game not found</div>
  } else if (status === 'success') {
    const game = getGameById(gameId as string)
    if (!game) {
      return <div className="error">Game not found</div>
    }
    return <GamePage game={game} view={view as string} />
  }
}