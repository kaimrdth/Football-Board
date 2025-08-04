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

  const teamColor = player.color || (player.team === 'red' ? '#dc2626' : '#2563eb');

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
        className="w-full h-full flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          background: teamColor,
          border: isSelected ? `3px solid #f59e0b` : `2px solid #ffffff`,
          boxShadow: isSelected 
            ? `0 0 0 2px #f59e0b`
            : `0 2px 4px rgba(0, 0, 0, 0.1)`
        }}
      >
        {/* Player number */}
        <span 
          className="font-semibold text-white"
          style={{ 
            fontSize: '11px', 
            position: 'relative',
            zIndex: 2,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600'
          }}
        >
          {player.number}
        </span>
      </div>
      
      
      {/* Player name label */}
      <div 
        className="absolute"
        style={{
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '4px',
          fontSize: '10px',
          whiteSpace: 'nowrap',
          color: teamColor,
          fontWeight: '500',
          pointerEvents: 'none',
          opacity: (isDndKitDragging || isDragging) ? 0 : 0.8,
          transition: 'opacity 0.2s ease',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {player.name}
      </div>
      
    </div>
  );
});

Player.displayName = 'Player';

export default Player;