import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './common.css';
import './SharePage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function SharePage() {
  const navigate = useNavigate();
  const qrUrl = `${window.location.origin}${window.location.pathname}#/install`;  // "#/" for HashRouter
  console.log("origin:", window.location.origin);
  console.log("pathname:", window.location.pathname);
  console.log("qrUrl:", qrUrl);

  return (
    <div className="page share-page">
      <header>
        <button 
          className="header-fixed-left header-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
        <div className="header-title">
          <h1>Share</h1>
        </div>
      </header>
      <main>
        <div className="qr-container">
          <QRCodeSVG 
            value={qrUrl}
            size={256}
            level="H"
          />
          <p className="share-text">Scan to play eggames!</p>
        </div>
      </main>
    </div>
  );
}

export default SharePage;