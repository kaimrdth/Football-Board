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
    <div className="glass-surface rounded-sm p-6 mb-5">
      <div className="space-y-6">
        {/* Formation Controls */}
        <div className="space-y-4">
          <h3 style={{ 
            color: '#cbd5e0', 
            fontWeight: '600', 
            fontSize: '14px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            borderBottom: '1px solid rgba(74, 85, 104, 0.3)',
            paddingBottom: '8px'
          }}>
            Formation Controls
          </h3>
          <div className="flex flex-wrap gap-4">
            <FormationSelector team="red" onFormationChange={handleFormationChange} />
            <FormationSelector team="blue" onFormationChange={handleFormationChange} />
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          <h3 style={{ 
            color: '#cbd5e0', 
            fontWeight: '600', 
            fontSize: '14px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            borderBottom: '1px solid rgba(74, 85, 104, 0.3)',
            paddingBottom: '8px'
          }}>
            Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <ControlButton onClick={resetBall}>
              Reset Ball
            </ControlButton>
            <ControlButton onClick={clearAll}>
              Clear All
            </ControlButton>
            <ControlButton onClick={switchSides}>
              Switch Sides
            </ControlButton>
            <ControlButton onClick={resetFormations}>
              Reset Formations
            </ControlButton>
            <ControlButton onClick={handleOpenRoster}>
              Edit Roster
            </ControlButton>
            <ControlButton onClick={handleOpenSave}>
              💾 Save Tactics
            </ControlButton>
            <ControlButton onClick={handleOpenLoad}>
              📁 Load Tactics
            </ControlButton>
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

  const teamColor = team === 'red' ? '#f87171' : '#60a5fa';

  return (
    <div className="flex items-center gap-3">
      <span style={{ 
        color: teamColor, 
        fontWeight: '600', 
        textTransform: 'uppercase' as const,
        fontSize: '12px',
        letterSpacing: '0.05em',
        fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
      }}>
        {team} Formation:
      </span>
      <select
        style={{ 
          padding: '10px 14px', 
          backgroundColor: 'rgba(26, 32, 44, 0.8)', 
          color: '#e2e8f0', 
          borderRadius: '6px', 
          border: '1px solid rgba(74, 85, 104, 0.4)',
          fontSize: '13px',
          fontWeight: '500',
          fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onChange={(e) => onFormationChange(team, e.target.value as FormationType)}
        defaultValue={team === 'red' ? '4-4-2' : '4-3-3'}
        onFocus={(e) => {
          e.target.style.borderColor = teamColor;
          e.target.style.boxShadow = `0 0 0 2px ${teamColor}20`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(74, 85, 104, 0.4)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {formations.map(formation => (
          <option 
            key={formation} 
            value={formation}
            style={{
              backgroundColor: 'rgba(26, 32, 44, 0.95)',
              color: '#e2e8f0'
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

  const baseStyle = {
    padding: '12px 20px',
    backgroundColor: isHovered ? 'rgba(45, 55, 72, 0.9)' : 'rgba(26, 32, 44, 0.7)',
    border: '1px solid rgba(74, 85, 104, 0.4)',
    color: isHovered ? '#e2e8f0' : '#a0aec0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '13px',
    fontFamily: 'ui-monospace, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    letterSpacing: '0.025em',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isHovered 
      ? '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
      : '0 2px 4px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    position: 'relative' as const,
    overflow: 'hidden',
    textTransform: 'uppercase' as const,
    userSelect: 'none' as const,
  };

  const destructiveActions = ['Clear All', 'Reset Formations'];
  const isDestructive = destructiveActions.some(action => 
    typeof children === 'string' && children.includes(action)
  );

  if (isDestructive) {
    baseStyle.border = '1px solid rgba(239, 68, 68, 0.3)';
    baseStyle.color = isHovered ? '#fca5a5' : '#ef4444';
    if (isHovered) {
      baseStyle.backgroundColor = 'rgba(127, 29, 29, 0.8)';
      baseStyle.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    }
  }

  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        (e.target as HTMLElement).style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        (e.target as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
});

FormationSelector.displayName = 'FormationSelector';
ControlButton.displayName = 'ControlButton';
Controls.displayName = 'Controls';

export default Controls;