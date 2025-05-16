import './TruthOrDarePage.css';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCog, FaDice } from 'react-icons/fa';
import TruthOrDareSettings from './TruthOrDareSettings';
import TruthOrDarePlay from './TruthOrDarePlay';
import Header from "../../components/Header";

function TruthOrDarePage() {
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
      {view === 'play' && (
        <Header
          leftBtn={{
            icons: [FaArrowLeft, FaDice],
            navDst: '/games',
          }}
          title="Truth or Dare"
          rightBtn={{
            icons: [FaCog],
            navDst: '?view=config',
          }}
        />
      )}
      {view === 'config' && (
        <Header
          leftBtn={{
            icons: [FaArrowLeft],
            navDst: -1,
          }}
          title="Truth or Dare Settings"
        />
      )}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default TruthOrDarePage;