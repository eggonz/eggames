import React from 'react';
import '../common.css';
import './TruthOrDarePage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {FaArrowLeft, FaCog} from 'react-icons/fa';
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
        <button
          className="header-fixed-left header-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft/>
        </button>
        {view === 'play' && (
          <button
            className="header-fixed-right header-button"
            onClick={() => navigate('?view=config')}
          >
            <FaCog />
          </button>
        )}
        {view === 'config' && (
          <h2 className="header-fixed-right">Settings</h2>
        )}
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default TruthOrDarePage;