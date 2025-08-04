import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Player as PlayerType, DragData } from '../types';
import { useGameStore } from '../stores/gameStore';

interface PlayerProps {
  player: PlayerType;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

const Player = React.memo(({ player, isDragging = false, style }: PlayerProps) => {
  const selectPlayer = useGameStore(state => state.selectPlayer);
  const selectedPlayer = useGameStore(state => state.selectedPlayer);
  
  const isSelected = selectedPlayer?.id === player.id;
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimeoutRef = React.useRef<number | null>(null);

  const dragData: DragData = {
    type: 'player',
    id: player.id
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDndKitDragging,
  } = useDraggable({
    id: player.id,
    data: dragData,
    disabled: isDragging, // Disable when in overlay
  });

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    setClickCount(prev => prev + 1);
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCount + 1 >= 2) {
        selectPlayer(player);
      }
      setClickCount(0);
    }, 300);
  }, [player, selectPlayer, clickCount]);

  React.useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const transformStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.1)`,
    willChange: 'transform', // Optimize for animations
  } : undefined;

  const teamColor = player.team === 'red' ? 'var(--secondary-neon)' : 'var(--accent-cyan)';
  const teamAccent = player.team === 'red' ? 'var(--error-red)' : 'var(--primary-neon)';

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: isDragging ? 0 : player.position.x,
        top: isDragging ? 0 : player.position.y,
        width: '28px',
        height: '28px',
        cursor: 'move',
        zIndex: (isDndKitDragging || isDragging) ? 1000 : 10,
        transition: 'none',
        userSelect: 'none',
        touchAction: 'none',
        ...transformStyle,
        ...style,
      }}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      {/* Main player shape */}
      <div 
        className="player-neo w-full h-full flex items-center justify-center animate-pulse"
        style={{
          background: `conic-gradient(from 0deg, ${teamColor}, ${teamAccent}, ${teamColor})`,
          border: isSelected ? `3px solid var(--warning-orange)` : `2px solid var(--text-primary)`,
          boxShadow: isSelected 
            ? `0 0 20px var(--warning-orange), inset 0 0 10px rgba(255, 255, 255, 0.2)`
            : `0 0 15px ${teamColor}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
          animationDelay: `${player.number * 0.1}s`
        }}
      >
        {/* Player number */}
        <span 
          className="font-mono font-bold neon-glow"
          style={{ 
            fontSize: '11px', 
            color: 'var(--text-primary)',
            textShadow: `0 0 8px var(--text-primary)`,
            position: 'relative',
            zIndex: 2
          }}
        >
          {player.number}
        </span>
      </div>
      
      {/* Player status indicators */}
      <div 
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
        style={{
          background: teamAccent,
          boxShadow: `0 0 6px ${teamAccent}`,
          animationDelay: `${player.number * 0.15}s`
        }}
      />
      
      {/* Player name label with futuristic styling */}
      <div 
        className="absolute font-mono"
        style={{
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '6px',
          fontSize: '9px',
          whiteSpace: 'nowrap',
          color: teamColor,
          fontWeight: '700',
          pointerEvents: 'none',
          textShadow: `0 0 6px ${teamColor}`,
          opacity: (isDndKitDragging || isDragging) ? 0 : 0.9,
          transition: 'none',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}
      >
        {player.name}
      </div>
      
      {/* Selection glow effect */}
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: 'transparent',
            border: '2px solid var(--warning-orange)',
            boxShadow: '0 0 25px var(--warning-orange)',
            transform: 'scale(1.4)',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
});

Player.displayName = 'Player';

export default Player;