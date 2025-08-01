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
        width: '15px',
        height: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        cursor: 'move',
        boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
        transform: transformStyle ? undefined : 'scale(1)', // Let transformStyle handle scaling when dragging
        zIndex: (isDndKitDragging || isDragging) ? 1000 : 15,
        transition: 'none', // Remove all transitions for instant response
        userSelect: 'none',
        touchAction: 'none',
        border: '1px solid #cccccc',
        ...transformStyle,
        ...style,
      }}
      {...listeners}
      {...attributes}
    />
  );
});

Ball.displayName = 'Ball';

export default Ball;