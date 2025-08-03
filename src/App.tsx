import DragContext from './components/DragContext';
import Pitch from './components/Pitch';
import Controls from './components/Controls';
import PlayerEditModal from './components/PlayerEditModal';
import { useGameStore } from './stores/gameStore';

function App() {
  const selectedPlayer = useGameStore(state => state.selectedPlayer);
  const selectPlayer = useGameStore(state => state.selectPlayer);

  return (
    <div className="min-h-screen p-5" style={{ background: '#1a1a1a', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 style={{ 
            color: '#e2e8f0',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            marginBottom: '8px'
          }}>
            FOOTBALLBOARD
          </h1>
          <div style={{
            height: '2px',
            width: '120px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(74, 85, 104, 0.6) 50%, transparent 100%)',
            margin: '0 auto'
          }} />
        </div>
        
        <DragContext>
          <Controls />
          <Pitch />
        </DragContext>
        
        <PlayerEditModal 
          player={selectedPlayer}
          onClose={() => selectPlayer(null)}
        />
      </div>
    </div>
  );
}

export default App;