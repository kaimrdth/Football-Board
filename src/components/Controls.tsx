import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { FormationType } from '../types';
import { getFormationName } from '../utils/formations';
import RosterModal from './RosterModal';
import SaveLoadModal from './SaveLoadModal';

const Controls = React.memo(() => {
  const {
    resetBall,
    clearAll,
    switchSides,
    resetFormations,
    setFormation,
  } = useGameStore();

  const [isRosterModalOpen, setIsRosterModalOpen] = React.useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = React.useState(false);

  const handleFormationChange = React.useCallback(
    (team: 'red' | 'blue', formation: FormationType) => {
      setFormation(team, formation);
    },
    [setFormation]
  );

  const handleOpenRoster = React.useCallback(() => {
    setIsRosterModalOpen(true);
  }, []);

  const handleCloseRoster = React.useCallback(() => {
    setIsRosterModalOpen(false);
  }, []);

  const handleOpenSave = React.useCallback(() => {
    setIsSaveModalOpen(true);
  }, []);

  const handleCloseSave = React.useCallback(() => {
    setIsSaveModalOpen(false);
  }, []);

  const handleOpenLoad = React.useCallback(() => {
    setIsLoadModalOpen(true);
  }, []);

  const handleCloseLoad = React.useCallback(() => {
    setIsLoadModalOpen(false);
  }, []);

  return (
    <div className="neo-brutalist-panel p-8 mb-8">
      {/* Header with animated elements */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 border-2 border-cyan-400 animate-spin" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
            <div className="absolute inset-0 border-2 border-pink-400 animate-spin" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)', animationDirection: 'reverse', animationDelay: '0.5s' }} />
          </div>
          <h2 className="glitch-text" data-text="COMMAND CENTER" style={{
            color: 'var(--primary-neon)',
            fontSize: '20px',
            fontWeight: '900',
            letterSpacing: '0.15em',
            fontFamily: 'Orbitron, monospace',
            textTransform: 'uppercase'
          }}>
            COMMAND CENTER
          </h2>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span style={{ color: 'var(--text-secondary)' }}>READY</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formation Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-pink-400" />
            <h3 className="neon-glow" style={{ 
              color: 'var(--accent-cyan)', 
              fontWeight: '700', 
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'Orbitron, monospace'
            }}>
              FORMATION MATRIX
            </h3>
          </div>
          
          <div className="space-y-4">
            <FormationSelector team="red" onFormationChange={handleFormationChange} />
            <FormationSelector team="blue" onFormationChange={handleFormationChange} />
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-0.5 h-6 bg-gradient-to-b from-pink-400 to-green-400" />
            <h3 className="neon-glow" style={{ 
              color: 'var(--secondary-neon)', 
              fontWeight: '700', 
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'Orbitron, monospace'
            }}>
              TACTICAL OPERATIONS
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <ControlButton onClick={resetBall}>RESET BALL</ControlButton>
            <ControlButton onClick={clearAll}>CLEAR ALL</ControlButton>
            <ControlButton onClick={switchSides}>SWITCH SIDES</ControlButton>
            <ControlButton onClick={resetFormations}>RESET FORMATIONS</ControlButton>
            <ControlButton onClick={handleOpenRoster}>EDIT ROSTER</ControlButton>
            <ControlButton onClick={handleOpenSave}>SAVE TACTICS</ControlButton>
            <ControlButton onClick={handleOpenLoad}>LOAD TACTICS</ControlButton>
          </div>
        </div>
      </div>

      <RosterModal 
        isOpen={isRosterModalOpen}
        onClose={handleCloseRoster}
      />
      
      <SaveLoadModal 
        isOpen={isSaveModalOpen}
        onClose={handleCloseSave}
        mode="save"
      />
      
      <SaveLoadModal 
        isOpen={isLoadModalOpen}
        onClose={handleCloseLoad}
        mode="load"
      />
    </div>
  );
});

interface FormationSelectorProps {
  team: 'red' | 'blue';
  onFormationChange: (team: 'red' | 'blue', formation: FormationType) => void;
}

const FormationSelector = React.memo(({ team, onFormationChange }: FormationSelectorProps) => {
  const formations: FormationType[] = ['4-4-2', '4-3-3', '3-5-2', '5-3-2', '4-2-3-1'];

  const teamColor = team === 'red' ? 'var(--secondary-neon)' : 'var(--accent-cyan)';
  const teamName = team === 'red' ? 'ALPHA' : 'BETA';

  return (
    <div className="relative p-4 border-2" style={{
      borderColor: teamColor,
      background: `linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6))`,
      clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
      boxShadow: `0 0 15px ${teamColor}30`
    }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 animate-pulse"
            style={{
              background: teamColor,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: `0 0 8px ${teamColor}`
            }}
          />
          <span className="neon-glow" style={{ 
            color: teamColor, 
            fontWeight: '700', 
            textTransform: 'uppercase',
            fontSize: '14px',
            letterSpacing: '0.1em',
            fontFamily: 'Orbitron, monospace'
          }}>
            TEAM {teamName}
          </span>
        </div>
        
        <div className="text-xs font-mono opacity-60" style={{ color: 'var(--text-secondary)' }}>
          FORMATION
        </div>
      </div>
      
      <select
        className="formation-selector w-full p-3 text-sm font-bold cursor-pointer"
        style={{ 
          background: `linear-gradient(135deg, var(--surface-1), rgba(${team === 'red' ? '255, 0, 128' : '0, 212, 255'}, 0.1))`,
          border: `2px solid ${teamColor}`,
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontWeight: '700',
          fontFamily: 'Orbitron, monospace',
          outline: 'none',
          backdropFilter: 'blur(8px)'
        }}
        onChange={(e) => onFormationChange(team, e.target.value as FormationType)}
        defaultValue={team === 'red' ? '4-4-2' : '4-3-3'}
      >
        {formations.map(formation => (
          <option 
            key={formation} 
            value={formation}
            style={{
              backgroundColor: 'var(--surface-1)',
              color: 'var(--text-primary)',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            {getFormationName(formation)}
          </option>
        ))}
      </select>
    </div>
  );
});

interface ControlButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ControlButton = React.memo(({ children, onClick }: ControlButtonProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const destructiveActions = ['CLEAR ALL', 'RESET FORMATIONS'];
  const isDestructive = destructiveActions.some(action => 
    typeof children === 'string' && children.includes(action)
  );

  const buttonColor = isDestructive ? 'var(--error-red)' : 'var(--accent-cyan)';
  const buttonHoverColor = isDestructive ? 'var(--warning-orange)' : 'var(--primary-neon)';

  return (
    <button
      className="retro-button p-3 text-xs font-bold transition-all duration-300"
      onClick={onClick}
      style={{
        background: isHovered 
          ? `linear-gradient(45deg, ${buttonHoverColor}, ${buttonColor})` 
          : `linear-gradient(45deg, var(--surface-2), var(--surface-1))`,
        border: `2px solid ${isHovered ? buttonHoverColor : buttonColor}`,
        color: isHovered ? 'var(--bg-dark)' : buttonColor,
        fontFamily: 'Orbitron, monospace',
        letterSpacing: '0.1em',
        boxShadow: isHovered 
          ? `0 0 20px ${buttonColor}, inset 0 0 20px rgba(255, 255, 255, 0.2)`
          : `0 4px 8px rgba(0, 0, 0, 0.3)`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: isHovered ? `0 0 10px ${buttonColor}` : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated background effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, transparent, ${buttonColor}20, transparent)`,
          opacity: isHovered ? 1 : 0
        }}
      />
    </button>
  );
});

FormationSelector.displayName = 'FormationSelector';
ControlButton.displayName = 'ControlButton';
Controls.displayName = 'Controls';

export default Controls;