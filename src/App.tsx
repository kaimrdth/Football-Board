import DragContext from './components/DragContext';
import Pitch from './components/Pitch';
import Controls from './components/Controls';
import PlayerEditModal from './components/PlayerEditModal';
import { useGameStore } from './stores/gameStore';

function App() {
  const selectedPlayer = useGameStore(state => state.selectedPlayer);
  const selectPlayer = useGameStore(state => state.selectPlayer);

  return (
    <div className="min-h-screen p-6 relative">
      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-30" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title header */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 
              style={{ 
                color: 'var(--primary-accent)',
                fontSize: '32px',
                fontWeight: '700',
                letterSpacing: '0.1em',
                fontFamily: 'Orbitron, monospace',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              TACTICAL NEXUS
            </h1>
            
            {/* Simple underline */}
            <div className="flex justify-center mt-3">
              <div 
                className="h-0.5 bg-gradient-to-r from-blue-400 to-green-400"
                style={{ width: '80px' }}
              />
            </div>
          </div>
          
          {/* Simple status indicator */}
          <div className="flex justify-center mt-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span style={{ color: 'var(--text-secondary)' }}>TACTICAL MODE ACTIVE</span>
            </div>
          </div>
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