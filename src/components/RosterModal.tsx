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
    clearAllPlayerNames();
    setEditedPlayers(prev => 
      prev.map(player => ({
        ...player,
        name: `Player ${player.number}`
      }))
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#ffffff',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '24px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        <h2 style={{ 
          marginBottom: '20px', 
          textAlign: 'center', 
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Edit Roster
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <th style={{ padding: '12px 8px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold' }}>Team</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold' }}>Name</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold' }}>#</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold' }}>Color</th>
              </tr>
            </thead>
            <tbody>
              {editedPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '8px' }}>
                    <span style={{ 
                      color: player.team === 'red' ? '#ff6b6b' : '#4dabf7',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {player.team}
                    </span>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, 'name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        backgroundColor: '#ffffff',
                        color: '#333333',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={player.number}
                      onChange={(e) => handlePlayerChange(player.id, 'number', e.target.value)}
                      style={{
                        width: '60px',
                        padding: '6px 8px',
                        backgroundColor: '#ffffff',
                        color: '#333333',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input
                      type="color"
                      value={player.color.includes('rgba') ? 
                        player.team === 'red' ? '#ff4444' : '#4444ff' 
                        : player.color
                      }
                      onChange={(e) => handlePlayerChange(player.id, 'color', e.target.value)}
                      style={{
                        width: '50px',
                        height: '30px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleClearAllNames}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              border: 'none',
              color: '#ffffff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Clear All Names
          </button>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#666666',
                border: 'none',
                color: '#ffffff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00bcd4',
                border: 'none',
                color: '#ffffff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
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