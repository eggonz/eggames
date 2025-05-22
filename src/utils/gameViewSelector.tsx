import React from "react"
import BingoInfo from "../components/games/BingoInfo"
import BingoPlay from "../components/games/BingoPlay"
import BingoSettings from "../components/games/BingoSettings"
import DummyInfo from "../components/games/DummyInfo"
import DummyPlay from "../components/games/DummyPlay"
import DummySettings from "../components/games/DummySettings"
import type { BingoConfig, DummyConfig, GameConfig } from "../types/GameConfig"
import type { BingoProgress, DummyProgress, GameProgress } from "../types/GameProgress"
import { NOT_IMPLEMENTED } from "./constantElements"

export function getInfoView(gameId: string) {
  switch (gameId) {
    case 'bingo':
      return <BingoInfo/>
    case 'dummy':
      return <DummyInfo/>
    // case 'word-guess':
    //   return <WordGuessInfo />
    default:
      return NOT_IMPLEMENTED
  }
}

export function getSettingsForm(gameId: string,
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
    // case 'word-guess':
    //   return <WordGuessSettings config={config as WordGuessConfig}
    //                             setConfig={setConfig as React.Dispatch<React.SetStateAction<WordGuessConfig>>} />
    default:
      return NOT_IMPLEMENTED
  }
}

export function getPlayView(
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
    // case 'word-guess':
    //   return <WordGuessPlay config={config as WordGuessConfig} />
    default:
      return NOT_IMPLEMENTED
  }
}