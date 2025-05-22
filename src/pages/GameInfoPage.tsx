import { FaArrowLeft, FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import BingoInfo from "../components/games/BingoInfo"
import DummyInfo from "../components/games/DummyInfo"
import Header from "../components/Header"
import useValidatedGame from "../hooks/useValidatedGame"
import ErrorPage from "./ErrorPage"

const NOT_IMPLEMENTED = <div>Game not implemented</div>

function renderView(gameId: string) {
  switch (gameId) {
    case 'bingo':
      return <BingoInfo />
    case 'dummy':
      return <DummyInfo />
    // case 'word-guess':
    //   return <WordGuessInfo />
    default:
      return NOT_IMPLEMENTED
  }
}

// Main Component
export default function GameInfoPage({ isNew = false }: { isNew?: boolean }) {
  const navigate = useNavigate()
  const { game, isValid } = useValidatedGame()

  // Render

  if (!isValid) return <ErrorPage code={404} />
  return (
    <div className="page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft],
          onClick: () => isNew? navigate('/games') : navigate(-1),
        }}
        title={game.name}
        rightBtn={
        isNew? {
          icons: [FaPlay],
          onClick: () => navigate(`/game/${game.id}/new/settings`),
        } : undefined }
      />
      <main>
        <div className="game-page info">
          {renderView(game.id)}
        </div>
      </main>
    </div>
  )
}