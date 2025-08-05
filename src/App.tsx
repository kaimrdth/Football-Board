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
    <div className="min-h-screen relative">
      {/* Fixed Header with Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm min-h-[4rem]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <h1 className="text-xl font-semibold text-gray-800">
              Football Board
            </h1>
            
            {/* Center: Formation Controls */}
            <FormationBar />
            
            {/* Right: All Controls */}
            <div className="flex items-center gap-3">
              <DisplayToggles />
              <SettingsMenu />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-24 sm:pt-28 p-4 sm:p-6 w-full">
        <div className="w-full max-w-7xl mx-auto relative z-10">
        
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
      
      <FloatingResetButton />
    </div>
  );
}

export default App;