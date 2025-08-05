import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { Player, Ball, Team, Position, FormationType, TeamInfo } from '../types';
import { FORMATIONS, createDefaultPlayers } from '../utils/formations';

interface GameStore {
  // State
  players: Player[];
  ball: Ball;
  selectedPlayer: Player | null;
  showPlayerNames: boolean;
  showPlayerNumbers: boolean;
  teams: {
    team1: TeamInfo;
    team2: TeamInfo;
  };
  
  // Actions
  updatePlayerPosition: (playerId: string, position: Position) => void;
  updateBallPosition: (position: Position) => void;
  updatePlayer: (playerId: string, updates: Partial<Omit<Player, 'id'>>) => void;
  selectPlayer: (player: Player | null) => void;
  setFormation: (team: Team, formation: FormationType) => void;
  switchSides: () => void;
  resetBall: () => void;
  clearAll: () => void;
  resetFormations: () => void;
  clearAllPlayerNames: () => void;
  togglePlayerNames: () => void;
  togglePlayerNumbers: () => void;
  updateTeamInfo: (team: Team, updates: Partial<TeamInfo>) => void;
}

const PITCH_WIDTH = 1200;
const PITCH_HEIGHT = 780;

export const useGameStore = create<GameStore>()(
  subscribeWithSelector(
    immer((set) => ({
      // Initial state
      players: createDefaultPlayers(),
      ball: { position: { x: PITCH_WIDTH / 2 - 7.5, y: PITCH_HEIGHT / 2 - 7.5 } },
      selectedPlayer: null,
      showPlayerNames: true,
      showPlayerNumbers: true,
      teams: {
        team1: {
          name: 'Team 1',
          kitColor: '#dc2626',
          gkKitColor: '#16a34a'
        },
        team2: {
          name: 'Team 2', 
          kitColor: '#2563eb',
          gkKitColor: '#ca8a04'
        }
      },

      // Actions
      updatePlayerPosition: (playerId: string, position: Position) =>
        set((state) => {
          const player = state.players.find((p: Player) => p.id === playerId);
          if (player) {
            player.position = position;
          }
        }),

      updateBallPosition: (position: Position) =>
        set((state) => {
          state.ball.position = position;
        }),

      updatePlayer: (playerId: string, updates: Partial<Omit<Player, 'id'>>) =>
        set((state) => {
          const player = state.players.find((p: Player) => p.id === playerId);
          if (player) {
            Object.assign(player, updates);
          }
        }),

      selectPlayer: (player: Player | null) =>
        set((state) => {
          state.selectedPlayer = player;
        }),

      setFormation: (team: Team, formation: FormationType) =>
        set((state) => {
          const teamPlayers = state.players.filter((p: Player) => p.team === team);
          const positions = FORMATIONS[formation];
          
          for (let i = 0; i < Math.min(teamPlayers.length, positions.length); i++) {
            const player = teamPlayers[i];
            const position = positions[i];
            
            if (team === 'team1') {
              player.position = {
                x: (position.x / 100) * (PITCH_WIDTH - 25),
                y: (position.y / 100) * (PITCH_HEIGHT - 25)
              };
            } else {
              // Mirror for team2
              player.position = {
                x: ((100 - position.x) / 100) * (PITCH_WIDTH - 25),
                y: (position.y / 100) * (PITCH_HEIGHT - 25)
              };
            }
          }
        }),

      switchSides: () =>
        set((state) => {
          state.players.forEach((player: Player) => {
            player.position.x = PITCH_WIDTH - player.position.x - 25;
          });
        }),

      resetBall: () =>
        set((state) => {
          state.ball.position = { 
            x: PITCH_WIDTH / 2 - 7.5, 
            y: PITCH_HEIGHT / 2 - 7.5 
          };
        }),

      clearAll: () =>
        set((state) => {
          state.players = [];
          state.selectedPlayer = null;
        }),

      resetFormations: () =>
        set((state) => {
          state.players = createDefaultPlayers();
          state.selectedPlayer = null;
          state.ball.position = { 
            x: PITCH_WIDTH / 2 - 7.5, 
            y: PITCH_HEIGHT / 2 - 7.5 
          };
        }),

      clearAllPlayerNames: () =>
        set((state) => {
          state.players.forEach((player: Player) => {
            player.name = `Player ${player.number}`;
          });
        }),

      togglePlayerNames: () =>
        set((state) => {
          state.showPlayerNames = !state.showPlayerNames;
        }),

      togglePlayerNumbers: () =>
        set((state) => {
          state.showPlayerNumbers = !state.showPlayerNumbers;
        }),

      updateTeamInfo: (team: Team, updates: Partial<TeamInfo>) =>
        set((state) => {
          Object.assign(state.teams[team], updates);
        }),
    }))
  )
);

// Selector hooks for performance optimization
export const usePlayers = () => useGameStore(state => state.players);
export const usePlayersByTeam = (team: Team) => 
  useGameStore(state => state.players.filter(p => p.team === team));
export const useBall = () => useGameStore(state => state.ball);
export const useSelectedPlayer = () => useGameStore(state => state.selectedPlayer);