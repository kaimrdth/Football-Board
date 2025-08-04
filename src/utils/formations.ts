import { Position, Player, FormationType } from '../types';

export const FORMATIONS: Record<FormationType, Position[]> = {
  '4-4-2': [
    { x: 5, y: 50 },   // Goalkeeper
    { x: 20, y: 20 },  // Right back
    { x: 20, y: 40 },  // Center back
    { x: 20, y: 60 },  // Center back
    { x: 20, y: 80 },  // Left back
    { x: 45, y: 20 },  // Right mid
    { x: 35, y: 40 },  // Center mid
    { x: 35, y: 60 },  // Center mid
    { x: 45, y: 80 },  // Left mid
    { x: 65, y: 40 },  // Right forward
    { x: 65, y: 60 }   // Left forward
  ],
  '4-3-3': [
    { x: 5, y: 50 },   // Goalkeeper
    { x: 20, y: 20 },  // Right back
    { x: 20, y: 40 },  // Center back
    { x: 20, y: 60 },  // Center back
    { x: 20, y: 80 },  // Left back
    { x: 40, y: 25 },  // Right mid
    { x: 40, y: 50 },  // Center mid
    { x: 40, y: 75 },  // Left mid
    { x: 65, y: 25 },  // Right wing
    { x: 65, y: 50 },  // Center forward
    { x: 65, y: 75 }   // Left wing
  ],
  '3-5-2': [
    { x: 5, y: 50 },   // Goalkeeper
    { x: 20, y: 30 },  // Right center back
    { x: 20, y: 50 },  // Center back
    { x: 20, y: 70 },  // Left center back
    { x: 40, y: 15 },  // Right wing back
    { x: 40, y: 35 },  // Right mid
    { x: 40, y: 50 },  // Center mid
    { x: 40, y: 65 },  // Left mid
    { x: 40, y: 85 },  // Left wing back
    { x: 65, y: 40 },  // Right forward
    { x: 65, y: 60 }   // Left forward
  ],
  '5-3-2': [
    { x: 5, y: 50 },   // Goalkeeper
    { x: 20, y: 15 },  // Right wing back
    { x: 20, y: 35 },  // Right center back
    { x: 20, y: 50 },  // Center back
    { x: 20, y: 65 },  // Left center back
    { x: 20, y: 85 },  // Left wing back
    { x: 45, y: 30 },  // Right mid
    { x: 45, y: 50 },  // Center mid
    { x: 45, y: 70 },  // Left mid
    { x: 65, y: 40 },  // Right forward
    { x: 65, y: 60 }   // Left forward
  ],
  '4-2-3-1': [
    { x: 5, y: 50 },   // Goalkeeper
    { x: 20, y: 20 },  // Right back
    { x: 20, y: 40 },  // Center back
    { x: 20, y: 60 },  // Center back
    { x: 20, y: 80 },  // Left back
    { x: 35, y: 35 },  // Right defensive mid
    { x: 35, y: 65 },  // Left defensive mid
    { x: 50, y: 20 },  // Right attacking mid
    { x: 50, y: 50 },  // Center attacking mid
    { x: 50, y: 80 },  // Left attacking mid
    { x: 70, y: 50 }   // Striker
  ]
};

const PITCH_WIDTH = 800;
const PITCH_HEIGHT = 520;

export function createDefaultPlayers(): Player[] {
  const players: Player[] = [];
  
  // Create Red team (4-4-2 formation)
  const redPositions = FORMATIONS['4-4-2'];
  for (let i = 0; i < 11; i++) {
    const position = redPositions[i];
    players.push({
      id: `player_red_${i + 1}`,
      number: i + 1,
      name: `Player ${i + 1}`,
      color: '#dc2626',
      team: 'red',
      position: {
        x: (position.x / 100) * (PITCH_WIDTH - 25),
        y: (position.y / 100) * (PITCH_HEIGHT - 25)
      }
    });
  }
  
  // Create Blue team (4-3-3 formation, mirrored)
  const bluePositions = FORMATIONS['4-3-3'];
  for (let i = 0; i < 11; i++) {
    const position = bluePositions[i];
    players.push({
      id: `player_blue_${i + 1}`,
      number: i + 1,
      name: `Player ${i + 1}`,
      color: '#2563eb',
      team: 'blue',
      position: {
        x: ((100 - position.x) / 100) * (PITCH_WIDTH - 25),
        y: (position.y / 100) * (PITCH_HEIGHT - 25)
      }
    });
  }
  
  return players;
}

export function getFormationName(formation: FormationType): string {
  const names: Record<FormationType, string> = {
    '4-4-2': '4-4-2 Classic',
    '4-3-3': '4-3-3 Attack',
    '3-5-2': '3-5-2 Wing Play',
    '5-3-2': '5-3-2 Defensive',
    '4-2-3-1': '4-2-3-1 Balanced'
  };
  return names[formation];
}