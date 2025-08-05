import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
// import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { useGameStore } from '../stores/gameStore';
import { DragData } from '../types';
import { constrainToPitch } from '../utils';
import Player from './Player';
import Ball from './Ball';

interface DragContextProps {
  children: React.ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeType, setActiveType] = React.useState<'player' | 'ball' | null>(null);
  
  const updatePlayerPosition = useGameStore(state => state.updatePlayerPosition);
  const updateBallPosition = useGameStore(state => state.updateBallPosition);
  const players = useGameStore(state => state.players);
  const ball = useGameStore(state => state.ball);

  // Configure sensors for immediate response
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Small distance to allow double-click events
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current as DragData;
    
    setActiveId(active.id as string);
    setActiveType(data.type);
  };

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, delta } = event;
    const data = active.data.current as DragData;

    if (!data) return;

    if (data.type === 'player') {
      const player = players.find(p => p.id === data.id);
      if (player) {
        const newPosition = constrainToPitch({
          x: player.position.x + delta.x,
          y: player.position.y + delta.y
        }, 25, 25, 1200, 780);
        updatePlayerPosition(data.id, newPosition);
      }
    } else if (data.type === 'ball') {
      const newPosition = constrainToPitch({
        x: ball.position.x + delta.x,
        y: ball.position.y + delta.y
      }, 15, 15, 1200, 780);
      updateBallPosition(newPosition);
    }

    setActiveId(null);
    setActiveType(null);
  }, [players, ball, updatePlayerPosition, updateBallPosition]);

  const renderDragOverlay = () => {
    if (!activeId || !activeType) return null;

    if (activeType === 'player') {
      const player = players.find(p => p.id === activeId);
      if (!player) return null;
      
      return (
        <Player 
          player={player} 
          isDragging 
          style={{ 
            opacity: 0.9 
          }}
        />
      );
    }

    if (activeType === 'ball') {
      return (
        <Ball 
          ball={ball} 
          isDragging 
          style={{ 
            opacity: 0.9 
          }}
        />
      );
    }

    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay 
        dropAnimation={{
          duration: 0, // No drop animation for instant response
          easing: 'linear',
        }}
      >
        {renderDragOverlay()}
      </DragOverlay>
    </DndContext>
  );
}