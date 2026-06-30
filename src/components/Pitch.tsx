import React from 'react';
import { usePlayers, useBall, useGameStore } from '../stores/gameStore';
import Player from './Player';
import Ball from './Ball';
import PitchOverlays from './PitchOverlays';

export const PITCH_WIDTH = 1200;
export const PITCH_HEIGHT = 780;

const Pitch = React.memo(() => {
  const players = usePlayers();
  const ball = useBall();
  const selectPlayer = useGameStore(state => state.selectPlayer);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / PITCH_WIDTH);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="neo-brutalist-panel p-3 sm:p-5 lg:p-7 w-full mx-auto"
      style={{
        // Fit the whole board on screen: bounded by width AND viewport height
        // so you can see everything at once while watching.
        maxWidth: `min(100%, calc((100vh - 180px) * ${PITCH_WIDTH} / ${PITCH_HEIGHT}))`,
      }}
    >
      {/* Aspect-ratio box keeps layout height correct while the board scales */}
      <div
        ref={wrapRef}
        className="relative w-full"
        style={{ aspectRatio: `${PITCH_WIDTH} / ${PITCH_HEIGHT}` }}
      >
        <div
          id="pitch-board"
          className="pitch-neo overflow-hidden"
          onClick={() => selectPlayer(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: PITCH_WIDTH,
            height: PITCH_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Pitch markings */}
          <PitchMarkings />

          {/* Tactical overlays (thirds / channels) */}
          <PitchOverlays />

          {/* Players */}
          {players.map(player => (
            <Player key={player.id} player={player} />
          ))}

          {/* Ball */}
          <Ball ball={ball} />
        </div>
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
        width: 210,
        height: 210,
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
        width: 188,
        height: 464,
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
        width: 188,
        height: 464,
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
        width: 63,
        height: 212,
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
        width: 63,
        height: 212,
        transform: 'translateY(-50%)',
        borderColor: 'var(--pitch-line)'
      }}
    />

    {/* Left penalty spot */}
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: 126,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--pitch-line)',
        zIndex: 10
      }}
    />

    {/* Right penalty spot */}
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        right: 126,
        top: '50%',
        transform: 'translate(50%, -50%)',
        background: 'var(--pitch-line)',
        zIndex: 10
      }}
    />

{/* LEFT PENALTY ARC */}
<svg
  className="absolute"
  style={{
    left: 126,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    height: 210,
    overflow: 'visible'
  }}
>
  {/* centre the local coordinate system on (0,0) = penalty spot */}
  <g transform="translate(105 105)">
    <path
      d="M 62,-84.74 A 105,105 0 0,1 62,84.74"
      fill="none"
      stroke="var(--pitch-line)"
      strokeWidth="2"
    />
  </g>
</svg>

{/* RIGHT PENALTY ARC */}
<svg
  className="absolute"
  style={{
    right: 126,
    top: '50%',
    transform: 'translate(50%, -50%)',
    width: 210,
    height: 210,
    overflow: 'visible'
  }}
>
  <g transform="translate(105 105)">
    <path
      d="M -62,-84.74 A 105,105 0 0,0 -62,84.74"
      fill="none"
      stroke="var(--pitch-line)"
      strokeWidth="2"
    />
  </g>
</svg>
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
