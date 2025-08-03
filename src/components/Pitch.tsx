import React from 'react';
import { usePlayers, useBall } from '../stores/gameStore';
import Player from './Player';
import Ball from './Ball';

const Pitch = React.memo(() => {
  const players = usePlayers();
  const ball = useBall();

  return (
    <div className="glass-surface rounded-sm p-8 overflow-hidden">
      <div 
        className="relative mx-auto pitch-field border border-green-400 rounded-none overflow-hidden"
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
    </div>
  );
});

const PitchMarkings = React.memo(() => (
  <>
    {/* Center line (vertical) */}
    <div 
      className="absolute top-0 w-px h-full bg-black/40"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    />
    
    {/* Half line (horizontal) */}
    <div 
      className="absolute left-0 w-full h-px bg-black/40"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    />
    
    {/* Center circle */}
    <div 
      className="absolute border border-black rounded-full"
      style={{
        top: '50%',
        left: '50%',
        width: 140,
        height: 140,
        transform: 'translate(-50%, -50%)'
      }}
    />
    
    {/* Center spot */}
    <div 
      className="absolute w-1 h-1 bg-black rounded-full"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
    
    {/* Left penalty area */}
    <div 
      className="absolute border border-black border-l-0"
      style={{
        left: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)'
      }}
    />
    
    {/* Right penalty area */}
    <div 
      className="absolute border border-black border-r-0"
      style={{
        right: 0,
        top: '50%',
        width: 125,
        height: 309,
        transform: 'translateY(-50%)'
      }}
    />
    
    {/* Left goal area */}
    <div 
      className="absolute border border-black border-l-0"
      style={{
        left: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)'
      }}
    />
    
    {/* Right goal area */}
    <div 
      className="absolute border border-black border-r-0"
      style={{
        right: 0,
        top: '50%',
        width: 42,
        height: 141,
        transform: 'translateY(-50%)'
      }}
    />
    
    {/* Left penalty spot */}
    <div 
      className="absolute w-0.5 h-0.5 bg-black rounded-full"
      style={{
        left: 84,
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    
    {/* Right penalty spot */}
    <div 
      className="absolute w-0.5 h-0.5 bg-black rounded-full"
      style={{
        right: 84,
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
  </>
));

PitchMarkings.displayName = 'PitchMarkings';
Pitch.displayName = 'Pitch';

export default Pitch;