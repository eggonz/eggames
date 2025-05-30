import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { WordGuessView } from "../../constants/WordGuessView"
import WordLoader, { type WordEntry } from "../../data/WordLoader"
import type { WordGuessConfig } from "../../types/GameConfig"
import type { WordGuessProgress } from "../../types/GameProgress"
import { clearStoredConfig, clearStoredProgress } from "../../utils/gameStorage"
import { getNextIdx } from "../../utils/teamGetters"
import CardView from "./CardView/CardView"
import GuessedView from "./GuessedView/GuessedView"
import StartView from "./StartView/StartView"
import PointsView from "./PointsView/PointsView"
import TimeupView from "./TimeupView/TimeupView"
import WinnerView from "./WinnerView/WinnerView"

// Functions
function moveToNextPlayer(
  config: WordGuessConfig,
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
) {
  setProgress(prev => {
    const { nextTeamIdx, nextPlayerIdx } = getNextIdx(config, prev)
    return ({
      ...prev,
      playerIdx: {
        ...prev.playerIdx,
        [nextTeamIdx]: nextPlayerIdx,
      },
      teamIdx: nextTeamIdx,
      secret: null,
      roundWinnerTeamIdx: null,
      view: WordGuessView.START, // Reset view to START for the next player
    })
  })
}

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
  const [view, setView] = useState<number>(progress.view)

  const loader = new WordLoader<WordEntry>()

  const handleRestart = () => {
    clearStoredProgress(gameId)
    clearStoredConfig(gameId)
    navigate(`/game/${gameId}/new/settings`)
  }

  switch (view) {
    case WordGuessView.START:
      return <StartView
        loader={loader}
        config={config}
        progress={progress}
        setProgress={setProgress}
        onClickNext={() => {
          setProgress(prev => ({ ...prev, view: WordGuessView.CARD }))  // TODO setProgress called twice. storage updated twice
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
        progress={progress}
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
        onClickNext={() => {
          moveToNextPlayer(config, setProgress)
          setView(WordGuessView.START)
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
        onClickRestart={handleRestart}
      />
    default:
      return null
  }
}