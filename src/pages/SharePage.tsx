import { QRCodeSVG } from 'qrcode.react';
import './SharePage.css';
import { FaArrowLeft } from 'react-icons/fa';
import Header from "../components/Header";

function SharePage() {
  const qrUrl = `${window.location.origin}${window.location.pathname}#/install`;  // "#/" for HashRouter

  return (
    <div className="page share-page">
      <Header
        leftBtn={{
          icons: [FaArrowLeft],
          navDst: '/',
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