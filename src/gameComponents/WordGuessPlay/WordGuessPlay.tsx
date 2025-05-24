import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { WordGuessView } from "../../constants/WordGuessView"
import WordLoader, { type WordEntry } from "../../data/WordLoader"
import type { WordGuessConfig } from "../../types/GameConfig"
import type { WordGuessProgress } from "../../types/GameProgress"
import { clearStoredConfig, clearStoredProgress } from "../../utils/gameStorage"
import CardView from "./CardView/CardView"
import GuessedView from "./GuessedView/GuessedView"
import NextView from "./NextView/NextView"
import PointsView from "./PointsView/PointsView"
import TimeupView from "./TimeupView/TimeupView"
import WinnerView from "./WinnerView/WinnerView"


// Interfaces
interface PlayProps {
  gameId: string
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
}

// Main Component
export default function WordGuessPlay({ gameId, config, progress, setProgress }: PlayProps) {
  const navigate = useNavigate()
  const [view, setView] = useState<WordGuessView>(progress.view)

  const loader = new WordLoader<WordEntry>()

  const handleRestart = () => {
    clearStoredProgress(gameId)
    clearStoredConfig(gameId)
    navigate(`/game/${gameId}/new/settings`)
  }

  switch (view) {
    case WordGuessView.NEXT:
      return <NextView
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClickNext={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.CARD }))
          setView(WordGuessView.CARD)
        }}
      />
    case WordGuessView.CARD:
      return <CardView
        loader={loader}
        config={config}
        progress={progress}
        setProgress={setProgress}
        onTimeUp={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.TIMEUP }))
          setView(WordGuessView.TIMEUP)
        }}
        onClickGuessed={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.GUESSED }))
          setView(WordGuessView.GUESSED)
        }}
      />
    case WordGuessView.TIMEUP:
      return <TimeupView
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClickGuessed={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.GUESSED }))
          setView(WordGuessView.GUESSED)
        }}
        onClickNext={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.POINTS }))
          setView(WordGuessView.POINTS)
        }}
      />
    case WordGuessView.GUESSED:
      return <GuessedView
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClick={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.POINTS }))
          setView(WordGuessView.POINTS)
        }}
      />
    case WordGuessView.POINTS:
      return <PointsView
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClickNext={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.NEXT }))
          setView(WordGuessView.NEXT)
        }}
        onClickWinner={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.WINNER }))
          setView(WordGuessView.WINNER)
        }}
      />
    case WordGuessView.WINNER:
      return <WinnerView
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClickRestart={handleRestart}
      />
    default:
      return null
  }
}