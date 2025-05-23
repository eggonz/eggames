import React, { useState } from "react"
import type { WordGuessConfig } from "../../types/GameConfig"
import type { WordGuessProgress } from "../../types/GameProgress"
import { Views } from "../../utils/constants"
import CardView, { CardViewButtonVariant } from "./CardView/CardView"
import GuessedView from "./GuessedView/GuessedView"
import NextView from "./NextView/NextView"
import PointsView, { PointsViewButtonVariant } from "./PointsView/PointsView"
import TimeupView from "./TimeupView/TimeupView"
import WinnerView from "./WinnerView/WinnerView"


// Interfaces
interface PlayProps {
  config: WordGuessConfig
  progress: WordGuessProgress
  setProgress: React.Dispatch<React.SetStateAction<WordGuessProgress>>
}

// Main Component
export default function WordGuessPlay({ config, progress, setProgress }: PlayProps) {
  const [view, setView] = useState(Views.WINNER)

  // TODO view is restarted (not saved) when we navigate back from info/settings

  switch (view) {
    case Views.NEXT:
      return <NextView
        onClickNext={() => setView(Views.CARD)}
      />
    case Views.CARD:
      return <CardView
        variant={CardViewButtonVariant.GUESS}
        onClickCard={() => {}} // TODO
        onClickSkip={() => {}} // TODO
        onTimeUp={() => {}} // TODO
        onClickGuessed={() => setView(Views.GUESSED)}
        onClickNext={() => setView(Views.TIMEUP)}
      />
    case Views.TIMEUP:
      return <TimeupView
        onClickGuessed={() => setView(Views.GUESSED)}
        onClickNext={() => setView(Views.POINTS)}
      />
    case Views.GUESSED:
      return <GuessedView
        onClickNext={() => setView(Views.POINTS)}
      />
    case Views.POINTS:
      return <PointsView
        variant={PointsViewButtonVariant.WINNER} // TODO
        onClickNext={() => setView(Views.NEXT)}
        onClickWinner={() => setView(Views.WINNER)}
      />
    case Views.WINNER:
      return <WinnerView
        config={config}
        progress={progress}
        onClickReset={() => setView(Views.NEXT)} // TODO back to /new/info
      />
    default:
      return null
  }
}