import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Player as PlayerType, DragData } from '../types';
import { useGameStore } from '../stores/gameStore';
import { getPlayerDisplayColor, isColorBright } from '../utils';

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

  const playerColor = getPlayerDisplayColor(player.color);
  const textColor = isColorBright(playerColor) ? '#000000' : '#ffffff';

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: isDragging ? 0 : player.position.x,
        top: isDragging ? 0 : player.position.y,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: playerColor,
        border: isSelected ? '3px solid #ffd700' : '2px solid #ffffff',
        color: textColor,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        transform: transformStyle ? undefined : 'scale(1)', // Let transformStyle handle scaling when dragging
        zIndex: (isDndKitDragging || isDragging) ? 1000 : 10,
        transition: 'none', // Remove all transitions for instant response
        userSelect: 'none',
        touchAction: 'none',
        ...transformStyle,
        ...style,
      }}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      <span style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: '1', color: textColor }}>
        {player.number}
      </span>
      
      {/* Player name label */}
      <div 
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '4px',
          fontSize: '10px',
          whiteSpace: 'nowrap',
          color: '#000000',
          fontWeight: 'bold',
          pointerEvents: 'none',
          textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
          opacity: (isDndKitDragging || isDragging) ? 0 : 0.8,
          transition: 'none' // Instant visibility changes
        }}
      >
        {player.name}
      </div>
    </div>
  );
});

Player.displayName = 'Player';

export default Player;