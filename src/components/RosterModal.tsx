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
  const teams = useGameStore(state => state.teams);

  const [editedPlayers, setEditedPlayers] = React.useState<Player[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setEditedPlayers([...players]);
    }
  }, [isOpen, players]);

  const handlePlayerChange = React.useCallback((playerId: string, field: keyof Player, value: string) => {
    setEditedPlayers(prev => 
      prev.map(player => 
        player.id === playerId 
          ? { ...player, [field]: field === 'number' ? parseInt(value) || 1 : value }
          : player
      )
    );
  }, []);

  const handleSave = React.useCallback(() => {
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
  }, [editedPlayers, players, updatePlayer, onClose]);


  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[2000] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 
                   w-full max-w-md sm:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-y-auto text-gray-900 
                   relative shadow-2xl mx-auto border border-gray-200"
        style={{ backgroundColor: '#ffffff', opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-500 
                     text-2xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center
                     hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          ×
        </button>

        <h2 className="mb-6 sm:mb-8 text-center text-gray-900 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
          Edit Roster
        </h2>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full border-collapse text-sm bg-gray-50 rounded-lg overflow-hidden min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-100">
                <th className="px-2 sm:px-3 py-4 text-left text-gray-700 font-bold text-xs tracking-wider w-16">Team</th>
                <th className="px-2 sm:px-3 py-4 text-left text-gray-700 font-bold text-xs tracking-wider">Name</th>
                <th className="px-2 sm:px-3 py-4 text-left text-gray-700 font-bold text-xs tracking-wider w-12">#</th>
                <th className="px-2 sm:px-3 py-4 text-left text-gray-700 font-bold text-xs tracking-wider w-16">Color</th>
              </tr>
            </thead>
            <tbody>
              {editedPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={`border-b border-gray-200 transition-colors duration-200 hover:bg-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-2 sm:px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: teams[player.team].kitColor }}
                      />
                      <span className="font-bold text-xs sm:text-sm text-gray-700">
                        {teams[player.team].name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-3">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, 'name', e.target.value)}
                      className="w-full px-2 sm:px-3 py-2 bg-white text-gray-800 border border-gray-300 
                                rounded-md text-xs sm:text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </td>
                  <td className="px-2 sm:px-3 py-3">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={player.number}
                      onChange={(e) => handlePlayerChange(player.id, 'number', e.target.value)}
                      className="w-12 sm:w-16 px-2 sm:px-3 py-2 bg-white text-gray-800 border border-gray-300 
                                rounded-md text-xs sm:text-sm transition-all duration-200 outline-none text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </td>
                  <td className="px-2 sm:px-3 py-3">
                    <input
                      type="color"
                      value={player.color}
                      onChange={(e) => handlePlayerChange(player.id, 'color', e.target.value)}
                      className="w-10 sm:w-12 h-8 sm:h-9 border-2 border-gray-300 rounded-md cursor-pointer 
                                transition-all duration-200 hover:border-gray-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 sm:mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 border-none text-white rounded-md cursor-pointer 
                       font-bold text-sm transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 border-none text-white rounded-md cursor-pointer 
                       font-bold text-sm transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
});

RosterModal.displayName = 'RosterModal';

export default RosterModal;