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
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Footballboard
          </h1>
        </div>
        
        {/* Bottom-center floating controls */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Controls />
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