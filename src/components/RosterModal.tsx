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
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '900px',
          maxHeight: '85vh',
          overflowY: 'auto',
          color: '#ffffff',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
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
          marginBottom: '32px', 
          textAlign: 'center', 
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: 'bold',
          letterSpacing: '-0.025em'
        }}>
          Edit Roster
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ 
                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>Team</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>Name</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>#</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>Color</th>
              </tr>
            </thead>
            <tbody>
              {editedPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      color: player.team === 'red' ? '#ff6b6b' : '#4dabf7',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {player.team}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, 'name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#1f2937',
                        border: '1px solid rgba(209, 213, 219, 0.3)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={player.number}
                      onChange={(e) => handlePlayerChange(player.id, 'number', e.target.value)}
                      style={{
                        width: '70px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#1f2937',
                        border: '1px solid rgba(209, 213, 219, 0.3)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        textAlign: 'center'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="color"
                      value={player.color.includes('rgba') ? 
                        player.team === 'red' ? '#ff4444' : '#4444ff' 
                        : player.color
                      }
                      onChange={(e) => handlePlayerChange(player.id, 'color', e.target.value)}
                      style={{
                        width: '60px',
                        height: '36px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease'
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
          flexDirection: 'column',
          gap: '16px', 
          marginTop: '30px'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={handleClearAllNames}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc2626',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#dc2626'}
            >
              Clear All Names
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'center'
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6b7280',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#6b7280'}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '12px 24px',
                backgroundColor: '#0891b2',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#0e7490'}
              onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#0891b2'}
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