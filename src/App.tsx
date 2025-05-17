import { HashRouter as Router, Route, Routes } from 'react-router-dom' // BrowserRouter not working for GH-Pages hosting
import GamePage from "./pages/GamePage"
import GamesListPage from './pages/GamesListPage'
import HomePage from './pages/HomePage'
import InstallPage from './pages/InstallPage'
import PlayersPage from './pages/PlayersPage'
import SharePage from './pages/SharePage'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/games" element={<GamesListPage />} />
          <Route path='/game/:gameId/:view' element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  )
}