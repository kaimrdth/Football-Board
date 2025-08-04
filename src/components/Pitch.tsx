import React from 'react';
import { usePlayers, useBall } from '../stores/gameStore';
import Player from './Player';
import Ball from './Ball';

const Pitch = React.memo(() => {
  const players = usePlayers();
  const ball = useBall();

  return (
    <div className="neo-brutalist-panel p-8 overflow-hidden mb-8">
      
      <div 
        className="relative mx-auto pitch-neo overflow-hidden"
        style={{ width: 800, height: 520 }}
      >
        {/* Pitch markings */}
        <PitchMarkings />
        
        {/* Players */}
        {players.map(player => (
          <Player key={player.id} player={player} />
        ))}
        
        {/* Ball */}
        <Ball ball={ball} />
      </div>
      
      {/* Bottom info bar */}
      <div className="flex justify-center mt-6 text-xs text-gray-500">
        <span>Drag & drop to reposition • Double-click to edit</span>
      </div>
    </div>
  );
});

const PitchMarkings = React.memo(() => (
  <>
    {/* Center line (vertical) */}
    <div 
      className="absolute top-0 h-full"
      style={{ 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '2px',
        background: 'var(--pitch-line)',
        zIndex: 10
      }}
    />
    
    
    {/* Center circle */}
    <div 
      className="absolute rounded-full"
      style={{
        top: '50%',
        left: '50%',
        width: 140,
        height: 140,
        transform: 'translate(-50%, -50%)',
        border: '2px solid var(--pitch-line)'
      }}
    />
    
    {/* Center spot */}
    <div 
      className="absolute w-2 h-2 rounded-full"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--pitch-line)'
      }}
    />
    
    {/* Left penalty area */}
    <div 
      className="absolute border-2 border-l-0"
      style={{
        left: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)',
        borderColor: 'var(--pitch-line)'
      }}
    />
    
    {/* Right penalty area */}
    <div 
      className="absolute border-2 border-r-0"
      style={{
        right: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)',
        borderColor: 'var(--pitch-line)'
      }}
    />
    
    {/* Left goal area */}
    <div 
      className="absolute border-2 border-l-0"
      style={{
        left: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)',
        borderColor: 'var(--pitch-line)'
      }}
    />
    
    {/* Right goal area */}
    <div 
      className="absolute border-2 border-r-0"
      style={{
        right: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)',
        borderColor: 'var(--pitch-line)'
      }}
    />
    
    {/* Left penalty spot */}
    <div 
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        left: 84,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--pitch-line)'
      }}
    />
    
    {/* Right penalty spot */}
    <div 
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        right: 84,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--pitch-line)'
      }}
    />
    
    {/* Corner markers */}
    {[{x: 0, y: 0}, {x: '100%', y: 0}, {x: 0, y: '100%'}, {x: '100%', y: '100%'}].map((pos, i) => (
      <div 
        key={i}
        className="absolute w-1 h-1"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'var(--pitch-line)'
        }}
      />
    ))}
  </>
));

PitchMarkings.displayName = 'PitchMarkings';
Pitch.displayName = 'Pitch';

export default Pitch;