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
        {/* Title header with controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <Controls />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Footballboard
            </h1>
          </div>
          <div className="flex-1"></div>
        </div>
        
        <DragContext>
          <div className="flex justify-center">
            <div className="flex-shrink-0">
              <Pitch />
            </div>
          </div>
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