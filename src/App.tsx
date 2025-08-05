import DragContext from './components/DragContext';
import Pitch from './components/Pitch';
import FormationBar from './components/FormationBar';
import FloatingResetButton from './components/FloatingResetButton';
import DisplayToggles from './components/DisplayToggles';
import SettingsMenu from './components/SettingsMenu';
import PlayerEditModal from './components/PlayerEditModal';
import { useGameStore } from './stores/gameStore';

function App() {
  const selectedPlayer = useGameStore(state => state.selectedPlayer);
  const selectPlayer = useGameStore(state => state.selectPlayer);

  return (
    <div className="min-h-screen p-6 relative">
      {/* New UI Layout */}
      <FormationBar />
      <SettingsMenu />
      <DisplayToggles />
      <FloatingResetButton />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title header */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Footballboard
          </h1>
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