import React from 'react';
import { useGameStore } from '../stores/gameStore';

const FloatingResetButton = React.memo(() => {
  const { resetBall } = useGameStore();

  return (
    <button
      onClick={resetBall}
      aria-label="Recenter ball"
      title="Recenter ball"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_8px_16px_-4px_rgba(15,23,42,0.18),0_4px_8px_-4px_rgba(15,23,42,0.10)] ring-1 ring-white/20 transition-all duration-200 hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.22)] hover:from-emerald-400 hover:to-teal-500 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 p-4"
    >
      <svg
        className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:rotate-180"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* recenter: crosshair with ball at center */}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:pl-2 group-hover:pr-1 group-hover:opacity-100">
        Recenter ball
      </span>
    </button>
  );
});

FloatingResetButton.displayName = 'FloatingResetButton';

export default FloatingResetButton;