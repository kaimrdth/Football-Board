export type Team = 'red' | 'blue';

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  number: number;
  name: string;
  color: string;
  team: Team;
  position: Position;
}

export interface Formation {
  name: string;
  positions: Position[];
}

export type FormationType = '4-4-2' | '4-3-3' | '3-5-2' | '5-3-2' | '4-2-3-1';

export interface Ball {
  position: Position;
}

export interface GameState {
  players: Player[];
  ball: Ball;
  selectedPlayer: Player | null;
}

// Drag and drop types
export interface DragData {
  type: 'player' | 'ball';
  id: string;
}

// Performance optimization types
export interface ViewportBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}