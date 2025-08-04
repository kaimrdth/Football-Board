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
      <div className="flex justify-center mt-6 text-xs font-mono opacity-60">
        <span style={{ color: 'var(--primary-neon)' }}>DRAG & DROP TO REPOSITION • DOUBLE-CLICK TO EDIT</span>
      </div>
    </div>
  );
});

const PitchMarkings = React.memo(() => (
  <>
    {/* Center line (vertical) */}
    <div 
      className="absolute top-0 h-full animate-pulse"
      style={{ 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '2px',
        background: 'linear-gradient(to bottom, var(--primary-neon), rgba(0, 255, 65, 0.8), var(--primary-neon))',
        boxShadow: '0 0 15px var(--primary-neon), 0 0 5px rgba(0, 255, 65, 0.5)',
        zIndex: 10
      }}
    />
    
    {/* Half line (horizontal) */}
    <div 
      className="absolute left-0 w-full animate-pulse"
      style={{ 
        top: '50%', 
        transform: 'translateY(-50%)',
        height: '2px',
        background: 'linear-gradient(to right, var(--primary-neon), rgba(0, 255, 65, 0.8), var(--primary-neon))',
        boxShadow: '0 0 15px var(--primary-neon), 0 0 5px rgba(0, 255, 65, 0.5)',
        animationDelay: '0.5s',
        zIndex: 10
      }}
    />
    
    {/* Center circle */}
    <div 
      className="absolute rounded-full animate-pulse"
      style={{
        top: '50%',
        left: '50%',
        width: 140,
        height: 140,
        transform: 'translate(-50%, -50%)',
        border: '2px solid var(--primary-neon)',
        boxShadow: '0 0 15px rgba(0, 255, 65, 0.4), inset 0 0 15px rgba(0, 255, 65, 0.1)',
        animationDelay: '1s'
      }}
    />
    
    {/* Center spot with glow */}
    <div 
      className="absolute w-2 h-2 rounded-full animate-pulse"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--accent-cyan)',
        boxShadow: '0 0 10px var(--accent-cyan)',
        animationDelay: '1.5s'
      }}
    />
    
    {/* Left penalty area */}
    <div 
      className="absolute border-2 border-l-0 animate-pulse"
      style={{
        left: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)',
        borderColor: 'var(--secondary-neon)',
        boxShadow: '0 0 10px rgba(255, 0, 128, 0.3)',
        animationDelay: '0.2s'
      }}
    />
    
    {/* Right penalty area */}
    <div 
      className="absolute border-2 border-r-0 animate-pulse"
      style={{
        right: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)',
        borderColor: 'var(--accent-cyan)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
        animationDelay: '0.7s'
      }}
    />
    
    {/* Left goal area */}
    <div 
      className="absolute border-2 border-l-0 animate-pulse"
      style={{
        left: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)',
        borderColor: 'var(--secondary-neon)',
        boxShadow: '0 0 8px rgba(255, 0, 128, 0.4)',
        animationDelay: '0.3s'
      }}
    />
    
    {/* Right goal area */}
    <div 
      className="absolute border-2 border-r-0 animate-pulse"
      style={{
        right: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)',
        borderColor: 'var(--accent-cyan)',
        boxShadow: '0 0 8px rgba(0, 212, 255, 0.4)',
        animationDelay: '0.8s'
      }}
    />
    
    {/* Left penalty spot */}
    <div 
      className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
      style={{
        left: 84,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--secondary-neon)',
        boxShadow: '0 0 8px var(--secondary-neon)',
        animationDelay: '2s'
      }}
    />
    
    {/* Right penalty spot */}
    <div 
      className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
      style={{
        right: 84,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--accent-cyan)',
        boxShadow: '0 0 8px var(--accent-cyan)',
        animationDelay: '2.5s'
      }}
    />
    
    {/* Corner markers */}
    {[{x: 0, y: 0}, {x: '100%', y: 0}, {x: 0, y: '100%'}, {x: '100%', y: '100%'}].map((pos, i) => (
      <div 
        key={i}
        className="absolute w-1 h-1 animate-pulse"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'var(--warning-orange)',
          boxShadow: '0 0 6px var(--warning-orange)',
          animationDelay: `${3 + i * 0.2}s`
        }}
      />
    ))}
  </>
));

PitchMarkings.displayName = 'PitchMarkings';
Pitch.displayName = 'Pitch';

export default Pitch;