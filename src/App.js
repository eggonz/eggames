import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import InstallPage from './components/InstallPage';
import PlayersPage from './components/PlayersPage';
import GamesPage from './components/GamesPage';
import SharePage from './components/SharePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/share" element={<SharePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;