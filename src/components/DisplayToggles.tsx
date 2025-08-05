import React from 'react';
import { useGameStore } from '../stores/gameStore';

const DisplayToggles = React.memo(() => {
  const {
    togglePlayerNames,
    togglePlayerNumbers,
    showPlayerNames,
    showPlayerNumbers,
  } = useGameStore();

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-2">
      <ToggleButton
        onClick={togglePlayerNames}
        isActive={showPlayerNames}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
        tooltip={showPlayerNames ? "Hide Names" : "Show Names"}
      />
      
      <ToggleButton
        onClick={togglePlayerNumbers}
        isActive={showPlayerNumbers}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        }
        tooltip={showPlayerNumbers ? "Hide Numbers" : "Show Numbers"}
      />
    </div>
  );
});

interface ToggleButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  tooltip: string;
}

const ToggleButton = React.memo(({ onClick, isActive, icon, tooltip }: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
        isActive 
          ? 'bg-blue-500 text-white shadow-md' 
          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-gray-800'
      }`}
      title={tooltip}
    >
      {icon}
    </button>
  );
});

ToggleButton.displayName = 'ToggleButton';
DisplayToggles.displayName = 'DisplayToggles';

export default DisplayToggles;