import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Ball as BallType, DragData } from '../types';

interface BallProps {
  ball: BallType;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

const Ball = React.memo(({ ball, isDragging = false, style }: BallProps) => {
  const dragData: DragData = {
    type: 'ball',
    id: 'ball'
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDndKitDragging,
  } = useDraggable({
    id: 'ball',
    data: dragData,
    disabled: isDragging,
  });

  const transformStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.2)`,
    willChange: 'transform', // Optimize for animations
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: isDragging ? 0 : ball.position.x,
        top: isDragging ? 0 : ball.position.y,
        width: '18px',
        height: '18px',
        cursor: 'move',
        zIndex: (isDndKitDragging || isDragging) ? 1000 : 15,
        transition: 'none',
        userSelect: 'none',
        touchAction: 'none',
        ...transformStyle,
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      {/* Main ball with simple styling */}
      <div 
        className="ball-neo w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #b0b0b0)',
          border: '1px solid var(--text-secondary)',
          position: 'relative'
        }}
      />
    </div>
  );
});

Ball.displayName = 'Ball';

export default Ball;