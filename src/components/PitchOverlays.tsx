import React from 'react';
import { useGameStore } from '../stores/gameStore';

const PITCH_W = 1200;
const PITCH_H = 780;

// Attack runs left↔right, so thirds are vertical bands across the length.
const THIRD_LINES = [PITCH_W / 3, (PITCH_W * 2) / 3];
const THIRD_LABELS = [
  { text: 'DEF', x: PITCH_W / 6 },
  { text: 'MID', x: PITCH_W / 2 },
  { text: 'ATT', x: (PITCH_W * 5) / 6 },
];

// 5 vertical channels run goal-to-goal, dividing the width (screen height) into fifths.
const CHANNEL_LINES = [
  PITCH_H / 5,
  (PITCH_H * 2) / 5,
  (PITCH_H * 3) / 5,
  (PITCH_H * 4) / 5,
];
// Lanes 2 and 4 are the half-spaces — the lanes worth highlighting.
const HALF_SPACES = [
  { y: PITCH_H / 5, h: PITCH_H / 5 },
  { y: (PITCH_H * 3) / 5, h: PITCH_H / 5 },
];

const LINE = 'rgba(255, 255, 255, 0.32)';

const PitchOverlays = React.memo(() => {
  const showThirds = useGameStore(state => state.showThirds);
  const showChannels = useGameStore(state => state.showChannels);

  if (!showThirds && !showChannels) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
      viewBox={`0 0 ${PITCH_W} ${PITCH_H}`}
      preserveAspectRatio="none"
      style={{ zIndex: 6 }}
      aria-hidden="true"
    >
      {showChannels && (
        <>
          {HALF_SPACES.map((lane, i) => (
            <rect
              key={`hs-${i}`}
              x={0}
              y={lane.y}
              width={PITCH_W}
              height={lane.h}
              fill="rgba(255, 255, 255, 0.06)"
            />
          ))}
          {CHANNEL_LINES.map((y, i) => (
            <line
              key={`ch-${i}`}
              x1={0}
              y1={y}
              x2={PITCH_W}
              y2={y}
              stroke={LINE}
              strokeWidth={1.5}
              strokeDasharray="10 8"
            />
          ))}
        </>
      )}

      {showThirds && (
        <>
          {THIRD_LINES.map((x, i) => (
            <line
              key={`th-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={PITCH_H}
              stroke={LINE}
              strokeWidth={1.5}
              strokeDasharray="10 8"
            />
          ))}
          {THIRD_LABELS.map((label) => (
            <text
              key={label.text}
              x={label.x}
              y={26}
              textAnchor="middle"
              fontSize={16}
              fontWeight={700}
              letterSpacing={2}
              fill="rgba(255, 255, 255, 0.4)"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {label.text}
            </text>
          ))}
        </>
      )}
    </svg>
  );
});

PitchOverlays.displayName = 'PitchOverlays';

export default PitchOverlays;
