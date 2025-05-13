import React from 'react';
import '../common.css';
import './TruthOrDarePage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function TruthOrDarePage() {
  const navigate = useNavigate();

  return (
    <div className="page truth-or-dare-page">
      <header>
        <h1 className="header-title">Truth or Dare</h1>
        <button 
          className="header-fixed-left header-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
      </header>
      <main>
        {/* Content will be added later */}
      </main>
    </div>
  );
}

export default TruthOrDarePage;