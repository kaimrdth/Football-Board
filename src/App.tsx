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
        {/* Glitch title header */}
        <div className="text-center mb-12 relative">
          <div className="inline-block relative">
            <h1 
              className="glitch-text neon-glow" 
              data-text="TACTICAL NEXUS"
              style={{ 
                color: 'var(--primary-neon)',
                fontSize: '42px',
                fontWeight: '900',
                letterSpacing: '0.2em',
                fontFamily: 'Orbitron, monospace',
                textTransform: 'uppercase',
                marginBottom: '16px',
                textShadow: '0 0 20px var(--primary-neon)'
              }}
            >
              TACTICAL NEXUS
            </h1>
            
            {/* Animated underline */}
            <div className="flex justify-center gap-1 mt-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div 
                  key={i}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-pink-400 animate-pulse"
                  style={{ 
                    width: '12px',
                    animationDelay: `${i * 0.2}s`,
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* System status indicators */}
          <div className="flex justify-center gap-6 mt-8 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span style={{ color: 'var(--text-secondary)' }}>SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span style={{ color: 'var(--text-secondary)' }}>TACTICAL MODE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span style={{ color: 'var(--text-secondary)' }}>NEXUS ACTIVE</span>
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