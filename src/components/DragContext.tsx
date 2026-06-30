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

// Logical board size; positions are stored in this coordinate space.
const PITCH_W = 1200;
const PITCH_H = 780;

// The board is CSS-scaled to fit the viewport, so screen pixels != logical
// pixels. Read the live scale from the rendered board.
const getBoardScale = () => {
  const el = document.getElementById('pitch-board');
  if (!el) return 1;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 ? rect.width / PITCH_W : 1;
};

export default function DragContext({ children }: DragContextProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeType, setActiveType] = React.useState<'player' | 'ball' | null>(null);
  const [dragScale, setDragScale] = React.useState(1);

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

    setDragScale(getBoardScale());
    setActiveId(active.id as string);
    setActiveType(data.type);
  };

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, delta } = event;
    const data = active.data.current as DragData;

    if (!data) return;

    // delta is in screen px; convert to logical board px.
    const scale = getBoardScale();
    const dx = delta.x / scale;
    const dy = delta.y / scale;

    if (data.type === 'player') {
      const player = players.find(p => p.id === data.id);
      if (player) {
        const newPosition = constrainToPitch({
          x: player.position.x + dx,
          y: player.position.y + dy
        }, 25, 25, PITCH_W, PITCH_H);
        updatePlayerPosition(data.id, newPosition);
      }
    } else if (data.type === 'ball') {
      const newPosition = constrainToPitch({
        x: ball.position.x + dx,
        y: ball.position.y + dy
      }, 15, 15, PITCH_W, PITCH_H);
      updateBallPosition(newPosition);
    }

    setActiveId(null);
    setActiveType(null);
  }, [players, ball, updatePlayerPosition, updateBallPosition]);

  const renderDragOverlay = () => {
    if (!activeId || !activeType) return null;

    const scaled = (node: React.ReactNode) => (
      <div style={{ transform: `scale(${dragScale})`, transformOrigin: 'top left' }}>
        {node}
      </div>
    );

    if (activeType === 'player') {
      const player = players.find(p => p.id === activeId);
      if (!player) return null;

      return scaled(<Player player={player} isDragging style={{ opacity: 0.9 }} />);
    }

    if (activeType === 'ball') {
      return scaled(<Ball ball={ball} isDragging style={{ opacity: 0.9 }} />);
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