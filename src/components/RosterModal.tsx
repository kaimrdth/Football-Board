import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { Player } from '../types';

interface RosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RosterModal = React.memo(({ isOpen, onClose }: RosterModalProps) => {
  const players = useGameStore(state => state.players);
  const updatePlayer = useGameStore(state => state.updatePlayer);
  const clearAllPlayerNames = useGameStore(state => state.clearAllPlayerNames);

  const [editedPlayers, setEditedPlayers] = React.useState<Player[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setEditedPlayers([...players]);
    }
  }, [isOpen, players]);

  const handlePlayerChange = (playerId: string, field: keyof Player, value: string) => {
    setEditedPlayers(prev => 
      prev.map(player => 
        player.id === playerId 
          ? { ...player, [field]: field === 'number' ? parseInt(value) || 1 : value }
          : player
      )
    );
  };

  const handleSave = () => {
    editedPlayers.forEach(player => {
      const original = players.find(p => p.id === player.id);
      if (original && (
        original.name !== player.name ||
        original.number !== player.number ||
        original.color !== player.color
      )) {
        updatePlayer(player.id, {
          name: player.name,
          number: player.number,
          color: player.color,
          team: player.team,
          position: player.position
        });
      }
    });
    onClose();
  };

  const handleClearAllNames = () => {
    // Update local state immediately for UI feedback
    setEditedPlayers(prev => 
      prev.map(player => ({
        ...player,
        name: `Player ${player.number}`
      }))
    );
    // Also update the store immediately so changes persist
    clearAllPlayerNames();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[2000] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl p-4 sm:p-6 lg:p-8 
                   w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto text-white 
                   relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-white text-opacity-80 
                     text-2xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center
                     hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
        >
          ×
        </button>

        <h2 className="mb-6 sm:mb-8 text-center text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
          Edit Roster
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm bg-white bg-opacity-5 rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b-2 border-white border-opacity-20 bg-white bg-opacity-5">
                <th className="px-3 py-4 text-left text-white font-bold text-xs tracking-wider">Team</th>
                <th className="px-3 py-4 text-left text-white font-bold text-xs tracking-wider">Name</th>
                <th className="px-3 py-4 text-left text-white font-bold text-xs tracking-wider">#</th>
                <th className="px-3 py-4 text-left text-white font-bold text-xs tracking-wider">Color</th>
              </tr>
            </thead>
            <tbody>
              {editedPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={`border-b border-white border-opacity-10 transition-colors duration-200 hover:bg-white hover:bg-opacity-5 ${
                    index % 2 === 0 ? 'bg-white bg-opacity-3' : 'bg-white bg-opacity-1'
                  }`}
                >
                  <td className="px-3 py-3">
                    <span className={`font-bold capitalize ${
                      player.team === 'red' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {player.team}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-white bg-opacity-95 text-gray-800 border border-gray-300 border-opacity-30 
                                rounded-md text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={player.number}
                      onChange={(e) => handlePlayerChange(player.id, 'number', e.target.value)}
                      className="w-16 px-3 py-2 bg-white bg-opacity-95 text-gray-800 border border-gray-300 border-opacity-30 
                                rounded-md text-sm transition-all duration-200 outline-none text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="color"
                      value={player.color.includes('rgba') ? 
                        player.team === 'red' ? '#ff4444' : '#4444ff' 
                        : player.color
                      }
                      onChange={(e) => handlePlayerChange(player.id, 'color', e.target.value)}
                      className="w-12 h-9 border-2 border-white border-opacity-20 rounded-md cursor-pointer 
                                transition-all duration-200 hover:border-opacity-40"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 mt-6 sm:mt-8">
          <div className="flex justify-center pb-4 border-b border-white border-opacity-10">
            <button
              onClick={handleClearAllNames}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 border-none text-white rounded-md cursor-pointer 
                         font-bold text-sm transition-colors duration-200"
            >
              Clear All Names
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 border-none text-white rounded-md cursor-pointer 
                         font-bold text-sm transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 border-none text-white rounded-md cursor-pointer 
                         font-bold text-sm transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

RosterModal.displayName = 'RosterModal';

export default RosterModal;