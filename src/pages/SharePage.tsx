import { QRCodeSVG } from 'qrcode.react';
import './SharePage.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";

function SharePage() {
  const navigate = useNavigate();
  const qrUrl = `${window.location.origin}${window.location.pathname}#/install`;  // "#/" for HashRouter

  return (
    <div className="page share-page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft],
          onClick: () => navigate('/'),
        }}
        title="Share"
      />
      <main>
        <div className="qr-container">
          <QRCodeSVG 
            value={qrUrl}
            size={256}
            level="H"
            fgColor={"#000000"}
            bgColor={"#ffffff00"}  // Transparent background
            className="qr-code"
          />
          <p className="share-text">Scan to play eggames!</p>
        </div>
      </main>
    </div>
  );
}

export default SharePage;