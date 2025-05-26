import { HashRouter as Router, Route, Routes } from 'react-router-dom' // BrowserRouter not working for GH-Pages hosting
import componentTestingSheet from './utils/componentTestingSheet'
import ErrorPage from "./pages/ErrorPage"
import GameInfoPage from "./pages/GameInfoPage"
import GamePlayPage from "./pages/GamePlayPage"
import GameSettingsPage from "./pages/GameSettingsPage"
import GamesListPage from './pages/GamesListPage'
import HomePage from './pages/HomePage'
import InstallPage from './pages/InstallPage'
import PlayersPage from './pages/PlayersPage'
import RouteGuardGame from "./pages/RouteGuardGame"
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
          <Route path='/game/:gameId/new/info' element={<RouteGuardGame><GameInfoPage isNew={true}/></RouteGuardGame>} />
          <Route path='/game/:gameId/new/settings' element={<RouteGuardGame><GameSettingsPage isNew={true}/></RouteGuardGame>} />
          <Route path='/game/:gameId/play' element={<RouteGuardGame><GamePlayPage/></RouteGuardGame>} />
          <Route path='/game/:gameId/info' element={<RouteGuardGame><GameInfoPage/></RouteGuardGame>} />
          <Route path='/game/:gameId/settings' element={<RouteGuardGame><GameSettingsPage/></RouteGuardGame>} />
          <Route path='/debug/components' element={componentTestingSheet()} />
          <Route path='*' element={<ErrorPage code={404} />} />
        </Routes>
      </div>
    </Router>
  )
}