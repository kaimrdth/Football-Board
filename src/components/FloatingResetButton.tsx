import React from 'react';
import { useGameStore } from '../stores/gameStore';

const FloatingResetButton = React.memo(() => {
  const { resetBall } = useGameStore();

  return (
    <button
      onClick={resetBall}
      className="fixed bottom-6 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
      title="Reset Ball Position"
    >
      <svg 
        className="w-6 h-6" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
});

FloatingResetButton.displayName = 'FloatingResetButton';

export default FloatingResetButton;