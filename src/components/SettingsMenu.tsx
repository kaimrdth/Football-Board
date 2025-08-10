import React from 'react';
import { useGameStore } from '../stores/gameStore';
import RosterModal from './RosterModal';
import SaveLoadModal from './SaveLoadModal';
import TeamCustomizationModal from './TeamCustomizationModal';

const SettingsMenu = React.memo(() => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = React.useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = React.useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = React.useState(false);

  const {
    clearAll,
    switchSides,
    resetFormations,
    teams,
    updateTeamInfo,
    togglePlayerNames,
    togglePlayerNumbers,
    showPlayerNames,
    showPlayerNumbers,
  } = useGameStore();

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleAction = React.useCallback((action: () => void) => {
    action();
    setIsOpen(false);
  }, []);

  return (
    <div className="relative min-w-fit" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl text-sm font-medium transition-all duration-200 border border-white/30 shadow-md hover:shadow-lg hover:scale-105 ${
          isOpen 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
            : 'bg-white/60 text-gray-700 hover:bg-white/80'
        }`}
        title="Settings Menu"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-semibold">Settings</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <MenuButton onClick={() => handleAction(togglePlayerNames)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="flex-1">{showPlayerNames ? 'Hide Player Names' : 'Show Player Names'}</span>
            <div className={`w-2 h-2 rounded-full ${showPlayerNames ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          </MenuButton>

          <MenuButton onClick={() => handleAction(togglePlayerNumbers)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className="flex-1">{showPlayerNumbers ? 'Hide Player Numbers' : 'Show Player Numbers'}</span>
            <div className={`w-2 h-2 rounded-full ${showPlayerNumbers ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          </MenuButton>

          <div className="border-t border-gray-100 my-1" />

          <MenuButton onClick={() => handleAction(() => setIsRosterModalOpen(true))}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Manage Roster
          </MenuButton>

          <MenuButton onClick={() => handleAction(() => setIsTeamModalOpen(true))}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Team Settings
          </MenuButton>

          <div className="border-t border-gray-100 my-1" />

          <MenuButton onClick={() => handleAction(() => setIsSaveModalOpen(true))}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Setup
          </MenuButton>

          <MenuButton onClick={() => handleAction(() => setIsLoadModalOpen(true))}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Load Setup
          </MenuButton>

          <div className="border-t border-gray-100 my-1" />

          <MenuButton onClick={() => handleAction(switchSides)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Switch Sides
          </MenuButton>

          <MenuButton onClick={() => handleAction(resetFormations)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Formations
          </MenuButton>

          <div className="border-t border-gray-100 my-1" />

          <MenuButton 
            onClick={() => handleAction(() => {
              if (confirm('This will clear all players and reset the board. Continue?')) {
                clearAll();
              }
            })}
            className="text-red-600 hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </MenuButton>
        </div>
      )}

      <RosterModal 
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
      />
      
      <SaveLoadModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        mode="save"
      />
      
      <SaveLoadModal 
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        mode="load"
      />
      
      <TeamCustomizationModal 
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teams={teams}
        updateTeamInfo={updateTeamInfo}
      />
    </div>
  );
});

interface MenuButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const MenuButton = React.memo(({ children, onClick, className = '' }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors ${className}`}
    >
      {children}
    </button>
  );
});

MenuButton.displayName = 'MenuButton';
SettingsMenu.displayName = 'SettingsMenu';

export default SettingsMenu;