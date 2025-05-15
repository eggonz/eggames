import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // BrowserRouter not working for GH-Pages hosting
import HomePage from './pages/HomePage';
import InstallPage from './pages/InstallPage';
import PlayersPage from './pages/PlayersPage';
import GamesPage from './pages/GamesPage';
import SharePage from './pages/SharePage';
import TruthOrDarePage from './pages/games/TruthOrDarePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/truth-or-dare" element={<TruthOrDarePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;