import React, { useState, useEffect } from 'react';
import './InstallPage.css';

function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

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
    <div className="install-page">
      <h1>Install Our App</h1>
      {deferredPrompt && (
        <button 
          onClick={handleInstallClick}
          className="install-button"
        >
          Install App
        </button>
      )}
      {!deferredPrompt && (
        <p>
          Either the app is already installed or your browser doesn't support PWA installation.
        </p>
      )}
    </div>
  );
}

export default InstallPage;