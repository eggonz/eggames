import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaCheck, FaCog, FaDice, FaPlay, FaTimes } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import BingoPlay from "../components/games/BingoPlay"
import BingoSettings from "../components/games/BingoSettings"
import DummyPlay from "../components/games/DummyPlay"
import DummySettings from "../components/games/DummySettings"
import WordGuessPlay from "../components/games/WordGuessPlay"
import WordGuessSettings from "../components/games/WordGuessSettings"
import Header from "../components/Header"
import { getDefaultConfig } from "../data/defaultConfigs"
import { getGameById } from "../data/gameData"
import { type BingoConfig } from "../types/BingoConfig"
import { type DummyConfig } from "../types/DummyConfig"
import type { Game } from "../types/Game"
import { type GameConfig } from "../types/GameConfig"
import { type WordGuessConfig } from "../types/WordGuessConfig"
import './GamePage.css'
import { clearStoredConfig, getStoredConfig, storeConfig } from "../utils/configStorage"

// Constants
const NOT_IMPLEMENTED = <div>Game not implemented</div>
const VALID_VIEWS = ['new', 'play', 'settings'] as const
const VALID_GAME_IDS = ['bingo', 'dummy', 'word-guess'] as const // implemented games

// Components
interface SettingsProps {
  game: Game
  config: GameConfig
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>
  isNewGame: boolean
}

function SettingsMain({ game, config, setConfig, isNewGame }: SettingsProps) {
  const navigate = useNavigate()

  const [currentConfig, setCurrentConfig] = useState<GameConfig>(config) // change tmp config

  // Whenever main config changes, update tmp config
  useEffect(() => {
    setCurrentConfig(config)
  }, [game.id, config])

  const renderContent = () => {
    switch (game.id) {
      case 'bingo':
        return <BingoSettings config={currentConfig as BingoConfig}
                              setConfig={setCurrentConfig as React.Dispatch<React.SetStateAction<BingoConfig>>} />
      case 'dummy':
        return <DummySettings config={currentConfig as DummyConfig}
                              setConfig={setCurrentConfig as React.Dispatch<React.SetStateAction<DummyConfig>>} />
      case 'word-guess':
        return <WordGuessSettings config={currentConfig as WordGuessConfig}
                                  setConfig={setCurrentConfig as React.Dispatch<React.SetStateAction<WordGuessConfig>>} />
      default:
        return NOT_IMPLEMENTED
    }
  }

  const handleStartGame = () => {
    storeConfig(game.id, currentConfig)
    setConfig(currentConfig) // update main config
    navigate(`/game/${game.id}/play`)
  }

  const renderHeader = () => {
    if (isNewGame) {
      return <Header
        leftBtn={{
          icons: [FaArrowLeft],
          onClick: () => navigate(-1),
        }}
        title={game.name}
        rightBtn={{
          icons: [FaPlay],
          onClick: () => handleStartGame(),
          disabled: !currentConfig.configured,
        }}
      />
    }
    return <Header
      leftBtn={{
        icons: [FaTimes],
        onClick: () => navigate(-1),
        color: 'red',
      }}
      title={game.name}
      rightBtn={{
        icons: [FaCheck],
        onClick: () => handleStartGame(),
        color: 'green',
      }}
    />
  }

  return (
    <div className="page">
      {renderHeader()}
      <main>
        <div className="game-page settings">
          <h2>Settings</h2>
          <div className="settings-content">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

interface PlayProps {
  game: Game
  config: GameConfig,
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>
}

function PlayMain({ game, config, setConfig }: PlayProps) {
  const navigate = useNavigate()

  // Whenever config changes during the game, update stored config to save progress
  useEffect(() => {
    storeConfig(game.id, config)
  }, [game.id, config])

  const renderContent = () => {
    switch (game.id) {
      case 'bingo':
        return <BingoPlay config={config as BingoConfig}
                          setConfig={setConfig as React.Dispatch<React.SetStateAction<BingoConfig>>} />
      case 'dummy':
        return <DummyPlay config={config as DummyConfig} />
      case 'word-guess':
        return <WordGuessPlay config={config as WordGuessConfig} />
      default:
        return NOT_IMPLEMENTED
    }
  }

  return (
    <div className="page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft, FaDice],
          onClick: () => navigate('/games')
        }}
        title={game.name}
        rightBtn={{
          icons: [FaCog],
          onClick: () => navigate(`/game/${game.id}/settings`),
        }}
      />
      <main>
        <div className="game-page play">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

// Main Component
interface GamePageProps {
  game: Game
  view: string
}

function GamePage({ game, view }: GamePageProps) {
  const navigate = useNavigate()
  const [config, setConfig] = useState<GameConfig>(getDefaultConfig(game.id))

  useEffect(() => {
    const storedConfig = getStoredConfig(game.id)
    if (view === 'new' && storedConfig) {
      const confirmResume = window.confirm('Saved game data found. Do you want to resume?')
      if (confirmResume) {
        setConfig(storedConfig)
        navigate(`/game/${game.id}/play`)
      } else {
        clearStoredConfig(game.id)
        setConfig(getDefaultConfig(game.id))
      }
    }
  }, [game.id, view, navigate])

  if (view == 'play') {
    return <PlayMain game={game} config={config} setConfig={setConfig} />
  } else if (view == 'settings') {
    return <SettingsMain game={game}
                         config={config}
                         setConfig={setConfig}
                         isNewGame={false} />
  } else if (view == 'new') {
    return <SettingsMain game={game}
                         config={config}
                         setConfig={setConfig}
                         isNewGame={true} />
  } else {
    return <div>Invalid view</div>
  }
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