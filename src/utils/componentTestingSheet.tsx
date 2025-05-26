import { FaHome } from "react-icons/fa"
import GameCard from "../components/GameCard"
import MainUiButton from '../components/MainUiButton/MainUiButton'

const ComponentTestingSheet = () => {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      <h1>Component Testing Sheet</h1>
      <section>
        <h2>MainUiButton</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <MainUiButton variant="primary" text={"Primary Button"} onClick={() => alert('Primary Button Clicked!')} />
          <MainUiButton variant="primary" disabled text={"Disabled Primary"} onClick={() => alert('Disabled Primary Button Clicked!')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem'  }}>
          <MainUiButton variant="secondary" text={"Secondary Button"} onClick={() => alert('Secondary Button Clicked!')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <MainUiButton Icon={FaHome} variant="primary" text={"Primary Button"} onClick={() => alert('Primary Button Clicked!')} />
          <MainUiButton Icon={FaHome} variant="secondary" text={"Secondary Button"} onClick={() => alert('Secondary Button Clicked!')} />
        </div>
      </section>
      <section>
        <h2>Game Cards</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <GameCard game={{ id: "test" , name: "Test", description: "Test Description", peopleLabel: "3+"}} />
        </div>
      </section>
    </div>
  )
}

export default ComponentTestingSheet