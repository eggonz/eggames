import React from "react"
import BingoInfo from "../gameComponents/BingoInfo"
import BingoPlay from "../gameComponents/BingoPlay"
import BingoSettings from "../gameComponents/BingoSettings"
import DummyInfo from "../gameComponents/DummyInfo"
import DummyPlay from "../gameComponents/DummyPlay"
import DummySettings from "../gameComponents/DummySettings"
import WordGuessInfo from "../gameComponents/WordGuessInfo"
import WordGuessPlay from "../gameComponents/WordGuessPlay"
import WordGuessSettings from "../gameComponents/WordGuessSettings"
import type { BingoConfig, DummyConfig, GameConfig, WordGuessConfig } from "../types/GameConfig"
import type { BingoProgress, DummyProgress, GameProgress, WordGuessProgress } from "../types/GameProgress"
import { NOT_IMPLEMENTED } from "../constants/elements"

export function getInfoContent(gameId: string) {
  switch (gameId) {
    case 'bingo':
      return <BingoInfo/>
    case 'dummy':
      return <DummyInfo/>
    case 'word-guess':
      return <WordGuessInfo />
    default:
      return NOT_IMPLEMENTED
  }
}

export function getSettingsContent(gameId: string,
                                   config: GameConfig,
                                   setConfig: React.Dispatch<React.SetStateAction<GameConfig>>,
                                   setConfigured: React.Dispatch<React.SetStateAction<boolean>>) {
  switch (gameId) {
    case 'bingo':
      return <BingoSettings config={config as BingoConfig}
                            setConfig={setConfig as React.Dispatch<React.SetStateAction<BingoConfig>>}
                            setConfigured={setConfigured}/>
    case 'dummy':
      return <DummySettings config={config as DummyConfig}
                            setConfig={setConfig as React.Dispatch<React.SetStateAction<DummyConfig>>}
                            setConfigured={setConfigured}/>
    case 'word-guess':
      return <WordGuessSettings config={config as WordGuessConfig}
                                setConfig={setConfig as React.Dispatch<React.SetStateAction<WordGuessConfig>>}
                                setConfigured={setConfigured}/>
    default:
      return NOT_IMPLEMENTED
  }
}

export function getPlayContent(
  gameId: string,
  config: GameConfig,
  progress: GameProgress,
  setProgress: React.Dispatch<React.SetStateAction<GameProgress>>
) {
  switch (gameId) {
    case 'bingo':
      return <BingoPlay config={config as BingoConfig}
                        progress={progress as BingoProgress}
                        setProgress={setProgress as React.Dispatch<React.SetStateAction<BingoProgress>>}/>
    case 'dummy':
      return <DummyPlay config={config as DummyConfig}
                        progress={progress as DummyProgress}
                        setProgress={setProgress as React.Dispatch<React.SetStateAction<DummyProgress>>}/>
    case 'word-guess':
      return <WordGuessPlay gameId={gameId}
                            config={config as WordGuessConfig}
                            progress={progress as WordGuessProgress}
                            setProgress={setProgress as React.Dispatch<React.SetStateAction<WordGuessProgress>>}/>
    default:
      return NOT_IMPLEMENTED
  }
}