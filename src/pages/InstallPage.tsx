import logo from '/logo.svg'
import { useEffect, useState } from 'react';
import './InstallPage.css';
import { FaDownload, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import MainUiButton from "../components/MainUiButton"

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

function InstallPage() {
  const navigate = useNavigate()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
  };

  return (
    <div className="page install-page">
      <Header title="Install" />
      <main>
        <div className="install-content">
          <img className="install-logo" src={logo} alt="App Logo" />
          {deferredPrompt && (
            <div>
              <button
                onClick={handleInstallClick}
                className="install-button"
              >
                  <FaDownload />
                  <p>Install App</p>
              </button>
              <p className="install-version">v{__APP_VERSION__}</p>
            </div>
          )}
          {!deferredPrompt && (
            <div className="install-message">
              <p>Either the app is already installed or <br/> your browser doesn't support PWA installation.</p>
              <div className="install-suggestions">
                <h2>Suggestions</h2>
                <ol className={"suggestions-list"}>
                  <li>Try to open using <i>Google Chrome</i></li>
                  <li>Create home screen shortcut (<i>iOS</i>/<i>Firefox</i>):</li>
                  <ol className={"suggestions-sublist"}>
                    <li>Open browser's options menu</li>
                    <li><i>Add app to Home screen</i></li>
                  </ol>
                  <li>Play directly from browser:</li>
                </ol>
              </div>
              <MainUiButton Icon={FaHome} text={"Go to Home screen"} onClick={() => navigate('/')} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default InstallPage;