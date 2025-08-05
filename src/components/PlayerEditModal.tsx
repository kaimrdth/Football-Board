import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { Player } from '../types';

interface PlayerEditModalProps {
  player: Player | null;
  onClose: () => void;
}

const PlayerEditModal = React.memo(({ player, onClose }: PlayerEditModalProps) => {
  const updatePlayer = useGameStore(state => state.updatePlayer);
  
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState(1);
  const [color, setColor] = React.useState('#ff4444');

  React.useEffect(() => {
    if (player) {
      setName(player.name);
      setNumber(player.number);
      setColor(player.color.includes('rgba') ? 
        player.team === 'team1' ? '#ff4444' : '#4444ff' 
        : player.color
      );
    }
  }, [player]);

  const handleSave = React.useCallback(() => {
    if (player) {
      updatePlayer(player.id, {
        name,
        number,
        color,
        team: player.team,
        position: player.position
      });
    }
    onClose();
  }, [player, name, number, color, updatePlayer, onClose]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [handleSave, onClose]);

  if (!player) return null;

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
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        style={{
          backgroundColor: 'rgba(26, 32, 44, 0.95)',
          border: '1px solid rgba(74, 85, 104, 0.4)',
          borderRadius: '8px',
          padding: '30px',
          minWidth: '400px',
          color: '#e2e8f0',
          position: 'relative',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'rgba(226, 232, 240, 0.8)',
            fontSize: '24px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(74, 85, 104, 0.3)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'rgba(226, 232, 240, 0.8)';
          }}
        >
          ×
        </button>

        <h2 style={{ 
          marginBottom: '25px', 
          textAlign: 'center', 
          color: '#e2e8f0',
          fontSize: '20px',
          fontWeight: '600',
          fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Edit Player
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: color,
              border: '2px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {number}
          </div>
          <div>
            <div style={{ 
              color: player.team === 'team1' ? '#f87171' : '#60a5fa',
              fontWeight: '600',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.05em',
              fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
            }}>
              {player.team} Team
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#cbd5e0',
              fontSize: '13px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
            }}>
              Player Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                color: '#e2e8f0',
                border: '1px solid rgba(74, 85, 104, 0.4)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                outline: 'none',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = player.team === 'team1' ? '#f87171' : '#60a5fa';
                e.target.style.boxShadow = `0 0 0 2px ${player.team === 'team1' ? '#f87171' : '#60a5fa'}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(74, 85, 104, 0.4)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#cbd5e0',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
              }}>
                Jersey Number
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(45, 55, 72, 0.6)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(74, 85, 104, 0.4)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = player.team === 'team1' ? '#f87171' : '#60a5fa';
                  e.target.style.boxShadow = `0 0 0 2px ${player.team === 'team1' ? '#f87171' : '#60a5fa'}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(74, 85, 104, 0.4)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#cbd5e0',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
              }}>
                Jersey Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  width: '100%',
                  height: '46px',
                  border: '1px solid rgba(74, 85, 104, 0.4)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = player.team === 'team1' ? '#f87171' : '#60a5fa';
                  e.target.style.boxShadow = `0 0 0 2px ${player.team === 'team1' ? '#f87171' : '#60a5fa'}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(74, 85, 104, 0.4)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '30px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(74, 85, 104, 0.6)',
              border: '1px solid rgba(74, 85, 104, 0.4)',
              color: '#a0aec0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 85, 104, 0.8)';
              e.currentTarget.style.color = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 85, 104, 0.6)';
              e.currentTarget.style.color = '#a0aec0';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 20px',
              backgroundColor: player.team === 'team1' ? 'rgba(248, 113, 113, 0.8)' : 'rgba(96, 165, 250, 0.8)',
              border: `1px solid ${player.team === 'team1' ? 'rgba(248, 113, 113, 0.4)' : 'rgba(96, 165, 250, 0.4)'}`,
              color: '#ffffff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = player.team === 'team1' ? 'rgba(248, 113, 113, 1)' : 'rgba(96, 165, 250, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = player.team === 'team1' ? 'rgba(248, 113, 113, 0.8)' : 'rgba(96, 165, 250, 0.8)';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
});

PlayerEditModal.displayName = 'PlayerEditModal';

export default PlayerEditModal;