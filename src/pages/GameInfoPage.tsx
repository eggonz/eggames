import { FaArrowLeft, FaDice, FaPlay } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import IconsButton from "../components/IconsButton"
import useValidatedGame from "../hooks/useValidatedGame"
import { getInfoContent } from "../utils/gameContentSelector"
import ErrorPage from "./ErrorPage"

// Main Component
export default function GameInfoPage({ isNew = false }: { isNew?: boolean }) {
  const navigate = useNavigate()
  const { game, isValid } = useValidatedGame()

  // Render

  if (!isValid) return <ErrorPage code={404} />
  return (
    <div className="page">
      <Header
        left={[
          <IconsButton icons={isNew? [FaArrowLeft, FaDice] : [FaArrowLeft]}
                       onClick={() => isNew? navigate('/games') : navigate(-1)} />
        ]}
        title={game.name}
        right={isNew? [
          <IconsButton icons={[FaPlay]}
                       onClick={() => navigate(`/game/${game.id}/new/settings`)} />
        ] : undefined }
      />
      <main>
        <div className="game-page info">
          {getInfoContent(game.id)}
        </div>
      </main>
    </div>
  )
}