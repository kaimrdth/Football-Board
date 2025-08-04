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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title header */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-3xl font-bold text-green-600 mb-3">
              Soccer Tactics Board
            </h1>
            
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