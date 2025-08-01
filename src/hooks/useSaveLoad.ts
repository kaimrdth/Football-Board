import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { Player, Ball } from '../types';

interface SaveData {
  version: string;
  timestamp: string;
  players: Player[];
  ball: Ball;
  metadata: {
    redFormation?: string;
    blueFormation?: string;
    description?: string;
  };
}

export const useSaveLoad = () => {
  const players = useGameStore(state => state.players);
  const ball = useGameStore(state => state.ball);
  const resetFormations = useGameStore(state => state.resetFormations);
  const updatePlayerPosition = useGameStore(state => state.updatePlayerPosition);
  const updatePlayer = useGameStore(state => state.updatePlayer);
  const updateBallPosition = useGameStore(state => state.updateBallPosition);

  const saveToFile = React.useCallback((description?: string) => {
    const saveData: SaveData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      players: players,
      ball: ball,
      metadata: {
        description: description || 'Soccer Tactics Board Save',
      }
    };

    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `tactics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
  }, [players, ball]);

  const loadFromFile = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          reject(new Error('No file selected'));
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const saveData: SaveData = JSON.parse(e.target?.result as string);
            
            // Validate the save data structure
            if (!saveData.players || !saveData.ball) {
              throw new Error('Invalid save file format');
            }

            // Clear current state
            resetFormations();

            // Load players
            saveData.players.forEach(player => {
              updatePlayer(player.id, {
                name: player.name,
                number: player.number,
                color: player.color,
                team: player.team,
                position: player.position
              });
              updatePlayerPosition(player.id, player.position);
            });

            // Load ball position
            updateBallPosition(saveData.ball.position);

            resolve();
          } catch (error) {
            reject(new Error('Failed to parse save file: ' + (error as Error).message));
          }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      };

      input.click();
    });
  }, [resetFormations, updatePlayer, updatePlayerPosition, updateBallPosition]);

  const exportToClipboard = React.useCallback(async (description?: string) => {
    const saveData: SaveData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      players: players,
      ball: ball,
      metadata: {
        description: description || 'Soccer Tactics Board Save',
      }
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(saveData, null, 2));
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, [players, ball]);

  const importFromClipboard = React.useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const saveData: SaveData = JSON.parse(clipboardText);
      
      // Validate the save data structure
      if (!saveData.players || !saveData.ball) {
        throw new Error('Invalid save data format');
      }

      // Clear current state
      resetFormations();

      // Load players
      saveData.players.forEach(player => {
        updatePlayer(player.id, {
          name: player.name,
          number: player.number,
          color: player.color,
          team: player.team,
          position: player.position
        });
        updatePlayerPosition(player.id, player.position);
      });

      // Load ball position
      updateBallPosition(saveData.ball.position);

      return true;
    } catch (error) {
      console.error('Failed to import from clipboard:', error);
      return false;
    }
  }, [resetFormations, updatePlayer, updatePlayerPosition, updateBallPosition]);

  return {
    saveToFile,
    loadFromFile,
    exportToClipboard,
    importFromClipboard
  };
};