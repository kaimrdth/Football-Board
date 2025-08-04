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
      {/* Main ball with neo styling */}
      <div 
        className="ball-neo w-full h-full rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle at 25% 25%, #ffffff, #f0f0f0, #d0d0d0)',
          border: '2px solid var(--primary-neon)',
          boxShadow: `
            0 0 15px rgba(0, 255, 65, 0.8),
            0 4px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6)
          `,
          position: 'relative'
        }}
      >
        {/* Inner glow effect */}
        <div 
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 60%)',
            pointerEvents: 'none'
          }}
        />
        
        {/* Animated energy ring */}
        <div 
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: '1px solid transparent',
            borderTop: '1px solid var(--primary-neon)',
            borderRight: '1px solid var(--accent-cyan)',
            animationDuration: '3s',
            opacity: 0.6
          }}
        />
      </div>
      
      {/* Ball trail effect when dragging */}
      {(isDndKitDragging || isDragging) && (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--primary-neon) 0%, transparent 70%)',
            transform: 'scale(2)',
            opacity: 0.3,
            pointerEvents: 'none',
            animation: 'pulse 0.5s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
});

Ball.displayName = 'Ball';

export default Ball;