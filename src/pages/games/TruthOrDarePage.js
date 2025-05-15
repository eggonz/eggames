import React from 'react';
import '../common.css';
import './TruthOrDarePage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {FaArrowLeft, FaCog, FaDice} from 'react-icons/fa';
import TruthOrDareSettings from './TruthOrDareSettings';
import TruthOrDarePlay from './TruthOrDarePlay';

function TruthOrDarePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get('view') || 'config';  // default to 'config'

  const renderContent = () => {
    switch (view) {
      case 'play':
        return <TruthOrDarePlay />;
      case 'config':
      default:
        return <TruthOrDareSettings />;
    }
  };

  return (
    <div className="page truth-or-dare-page">
      <header>
        <div className="header-title">
          <h1>Truth or Dare</h1>
        </div>
        {view === 'play' && (
          <button
            className="header-fixed-left header-button"
            onClick={() => navigate('/games')}
          >
            <FaArrowLeft />
            <FaDice />
          </button>
        )}
        {view === 'config' && (
          <button
            className="header-fixed-left header-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
        )}
        {view === 'play' && (
          <button
            className="header-fixed-right header-button"
            onClick={() => navigate('?view=config')}
          >
            <FaCog />
          </button>
        )}
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default TruthOrDarePage;