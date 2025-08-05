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

  const handleMouseEnter = React.useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 150);
  }, []);

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

  const [isExpanded, setIsExpanded] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-50">
      {/* Compact Controls Toggle */}
      <div 
        className={`neo-brutalist-panel transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'bg-white/95 backdrop-blur-md border-white/50' 
            : 'bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 hover:border-white/30'
        } ${!isExpanded ? 'animate-pulse-subtle' : ''}`}
        style={{
          width: isExpanded ? '320px' : 'auto',
          height: isExpanded ? 'auto' : 'auto',
          minWidth: isExpanded ? '320px' : '80px',
          willChange: 'width, height',
          boxShadow: isExpanded 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : '0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 8px rgba(255, 255, 255, 0.05)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Toggle Button */}
        <div className={`flex items-center justify-center relative group ${
          isExpanded ? 'p-4' : 'px-4 py-3'
        }`}>
          {isExpanded ? (
            <>
              <div className="w-6 h-6 flex items-center justify-center">
                <svg 
                  className="w-5 h-5 transition-colors duration-200 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Controls</span>
            </>
          ) : (
            <span className="text-sm font-medium text-white/70 drop-shadow-sm">Controls</span>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4">
            {/* Formation Controls */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Formations
              </h3>
              <div className="space-y-2">
                <FormationSelector team="red" onFormationChange={handleFormationChange} />
                <FormationSelector team="blue" onFormationChange={handleFormationChange} />
              </div>
            </div>

            {/* Action Controls */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <ControlButton onClick={resetBall}>Reset Ball</ControlButton>
                <ControlButton onClick={clearAll}>Clear All</ControlButton>
                <ControlButton onClick={switchSides}>Switch Sides</ControlButton>
                <ControlButton onClick={resetFormations}>Reset</ControlButton>
                <ControlButton onClick={handleOpenRoster}>Roster</ControlButton>
                <ControlButton onClick={handleOpenSave}>Save</ControlButton>
                <ControlButton onClick={handleOpenLoad}>Load</ControlButton>
              </div>
            </div>
          </div>
        )}
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

  const teamColor = team === 'red' ? 'var(--team-red)' : 'var(--team-blue)';
  const teamName = team === 'red' ? 'Red' : 'Blue';

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-1">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ background: teamColor }}
        />
        <span className="text-xs font-medium text-gray-700">
          {teamName}
        </span>
      </div>
      
      <select
        className="formation-selector w-full p-2 text-xs"
        onChange={(e) => onFormationChange(team, e.target.value as FormationType)}
        defaultValue={team === 'red' ? '4-4-2' : '4-3-3'}
      >
        {formations.map(formation => (
          <option key={formation} value={formation}>
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
  const destructiveActions = ['Clear All', 'Reset'];
  const isDestructive = destructiveActions.some(action => 
    typeof children === 'string' && children.toString().includes(action)
  );

  const buttonClass = isDestructive 
    ? 'bg-red-50/80 text-red-600 border-red-200/60 hover:bg-red-100/90'
    : '';

  return (
    <button
      className={`retro-button w-full py-2 px-3 text-xs font-medium transition-colors duration-150 ${buttonClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

FormationSelector.displayName = 'FormationSelector';
ControlButton.displayName = 'ControlButton';
Controls.displayName = 'Controls';

export default Controls;