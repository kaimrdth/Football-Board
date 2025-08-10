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
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
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
      </header>
      
      {/* Main Content Section */}
      <main className="flex-1 p-4 sm:p-6 w-full">
        <div className="w-full max-w-7xl mx-auto">
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
      </main>
      
      <FloatingResetButton />
    </div>
  );
}

export default App;