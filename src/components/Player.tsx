import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Player as PlayerType, DragData } from '../types';
import { useGameStore } from '../stores/gameStore';
import { isColorBright } from '../utils';

interface PlayerProps {
  player: PlayerType;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

const Player = React.memo(({ player, isDragging = false, style }: PlayerProps) => {
  const selectPlayer = useGameStore(state => state.selectPlayer);
  const setEditingPlayer = useGameStore(state => state.setEditingPlayer);
  const selectedPlayer = useGameStore(state => state.selectedPlayer);
  const showPlayerNames = useGameStore(state => state.showPlayerNames);
  const markerMode = useGameStore(state => state.markerMode);
  const teams = useGameStore(state => state.teams);

  const isSelected = selectedPlayer?.id === player.id;

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

  // Single click/tap: toggle highlight (track a player while watching).
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectPlayer(isSelected ? null : player);
  }, [player, selectPlayer, isSelected]);

  // Double click/tap: open the editor. (touchAction:none on the marker
  // suppresses double-tap zoom, so this is reliable on touch too.)
  const handleDoubleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPlayer(player);
  }, [player, setEditingPlayer]);

  const transformStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.1)`,
    willChange: 'transform', // Optimize for animations
  } : undefined;

  const teamInfo = teams[player.team];
  const isGoalkeeper = player.number === 1;
  const teamColor = isGoalkeeper ? teamInfo.gkKitColor : teamInfo.kitColor;
  const textColor = isColorBright(teamColor) ? '#000000' : '#ffffff';

  // Names sit directly on the grass — white with a dark halo stays legible over any stripe
  const nameTextColor = '#ffffff';

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: isDragging ? 0 : player.position.x,
        top: isDragging ? 0 : player.position.y,
        width: '28px',
        height: '28px',
        cursor: (isDndKitDragging || isDragging) ? 'grabbing' : 'grab',
        zIndex: (isDndKitDragging || isDragging) ? 1000 : 10,
        // The board is CSS-scaled, so dnd-kit's transform on the original would
        // move it incorrectly. Hide the original and let the scaled overlay show.
        opacity: (isDndKitDragging && !isDragging) ? 0 : 1,
        transition: 'none',
        userSelect: 'none',
        touchAction: 'none',
        ...transformStyle,
        ...style,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...listeners}
      {...attributes}
    >
      {/* Main player shape */}
      <div
        className="player-disc w-full h-full flex items-center justify-center rounded-full"
        style={{
          background: teamColor,
          border: '2px solid #ffffff',
          boxShadow: isSelected
            ? '0 0 0 3px var(--selection), 0 2px 6px rgba(0, 0, 0, 0.45)'
            : (isDndKitDragging || isDragging)
              ? '0 6px 14px rgba(0, 0, 0, 0.4)'
              : '0 1px 3px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Marker label: number or position code */}
        {markerMode !== 'none' && (() => {
          const label = markerMode === 'position' ? player.role : String(player.number);
          // Fit longer codes (e.g. RCB, CAM) inside the 28px disc.
          const fontSize = label.length >= 3 ? '8px' : label.length === 2 ? '10px' : '11px';
          return (
            <span
              className="font-semibold"
              style={{
                fontSize,
                position: 'relative',
                zIndex: 2,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '700',
                letterSpacing: label.length >= 3 ? '-0.02em' : '0',
                color: textColor,
                textShadow: textColor === '#ffffff'
                  ? '0 1px 1px rgba(0, 0, 0, 0.35)'
                  : 'none',
                lineHeight: 1
              }}
            >
              {label}
            </span>
          );
        })()}
      </div>
      
      
      {/* Player name label */}
      {showPlayerNames && (
        <div 
          className="absolute"
          style={{
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '4px',
            fontSize: '10px',
            whiteSpace: 'nowrap',
            color: nameTextColor,
            fontWeight: '600',
            letterSpacing: '0.01em',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.7), 0 0 2px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none',
            opacity: (isDndKitDragging || isDragging) ? 0 : 1,
            transition: 'opacity 0.2s ease',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {player.name}
        </div>
      )}
      
    </div>
  );
});

Player.displayName = 'Player';

export default Player;