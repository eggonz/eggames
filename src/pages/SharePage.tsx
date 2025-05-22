import { QRCodeSVG } from 'qrcode.react'
import './SharePage.css'
import { FaArrowLeft, FaHome } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import IconsButton from "../components/IconsButton"

export default function SharePage() {
  const navigate = useNavigate()
  const qrUrl = `${window.location.origin}${window.location.pathname}#/install`  // "#/" for HashRouter

  return (
    <div className="page share-page">
      <Header
        left={[
          <IconsButton icons={[FaArrowLeft, FaHome]}
                       onClick={() => navigate('/')} />
        ]}
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
  )
}