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
      <header className="relative bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Football Board
              </h1>
            </div>
            
            {/* Center: Formation Controls */}
            <div className="flex-1 flex justify-center px-8">
              <FormationBar />
            </div>
            
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