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
    <div className="neo-brutalist-panel p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-green-600 mb-4">
          Controls
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formation Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-blue-400 mb-4">
            Formations
          </h3>
          
          <div className="space-y-4">
            <FormationSelector team="red" onFormationChange={handleFormationChange} />
            <FormationSelector team="blue" onFormationChange={handleFormationChange} />
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-purple-400 mb-4">
            Actions
          </h3>
          
          <div className="flex flex-wrap gap-3">
            <ControlButton onClick={resetBall}>Reset Ball</ControlButton>
            <ControlButton onClick={clearAll}>Clear All</ControlButton>
            <ControlButton onClick={switchSides}>Switch Sides</ControlButton>
            <ControlButton onClick={resetFormations}>Reset Formations</ControlButton>
            <ControlButton onClick={handleOpenRoster}>Edit Roster</ControlButton>
            <ControlButton onClick={handleOpenSave}>Save Tactics</ControlButton>
            <ControlButton onClick={handleOpenLoad}>Load Tactics</ControlButton>
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
  const teamName = team === 'red' ? 'Red' : 'Blue';

  return (
    <div className="relative p-4 border rounded-lg" style={{
      borderColor: teamColor,
      background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6))`,
      boxShadow: `0 0 8px ${teamColor}20`
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
          <span className="font-medium text-sm" style={{ color: teamColor }}>
            Team {teamName}
          </span>
        </div>
        
        <div className="text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
          Formation
        </div>
      </div>
      
      <select
        className="formation-selector w-full p-3 text-sm font-bold cursor-pointer"
        style={{ 
          background: `linear-gradient(135deg, var(--surface-1), rgba(${team === 'red' ? '139, 92, 246' : '59, 130, 246'}, 0.05))`,
          border: `1px solid ${teamColor}`,
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontWeight: '500',
          outline: 'none',
          borderRadius: '4px'
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
              color: 'var(--text-primary)'
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

  const buttonColor = isDestructive ? 'var(--error-red)' : 'var(--accent-blue)';
  const buttonHoverColor = isDestructive ? 'var(--warning-orange)' : 'var(--primary-accent)';

  return (
    <button
      className="retro-button px-6 py-2.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap"
      onClick={onClick}
      style={{
        background: isHovered 
          ? `linear-gradient(45deg, ${buttonHoverColor}, ${buttonColor})` 
          : `linear-gradient(45deg, var(--surface-2), var(--surface-1))`,
        border: `1px solid ${isHovered ? buttonHoverColor : buttonColor}`,
        color: isHovered ? 'var(--bg-dark)' : buttonColor,
        boxShadow: isHovered 
          ? `0 2px 8px ${buttonColor}40, inset 0 0 10px rgba(255, 255, 255, 0.1)`
          : `0 2px 4px rgba(0, 0, 0, 0.2)`,
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        borderRadius: '8px',
        minWidth: 'fit-content'
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