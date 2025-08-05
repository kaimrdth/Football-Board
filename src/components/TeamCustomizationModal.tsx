import React from 'react';
import { Team, TeamInfo } from '../types';

interface TeamCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: {
    team1: TeamInfo;
    team2: TeamInfo;
  };
  updateTeamInfo: (team: Team, updates: Partial<TeamInfo>) => void;
}

const TeamCustomizationModal = React.memo(({ isOpen, onClose, teams, updateTeamInfo }: TeamCustomizationModalProps) => {
  const [localTeams, setLocalTeams] = React.useState(teams);

  React.useEffect(() => {
    setLocalTeams(teams);
  }, [teams]);

  const handleTeamChange = React.useCallback((team: Team, field: keyof TeamInfo, value: string) => {
    setLocalTeams(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: value
      }
    }));
  }, []);

  const handleSave = React.useCallback(() => {
    updateTeamInfo('team1', localTeams.team1);
    updateTeamInfo('team2', localTeams.team2);
    onClose();
  }, [localTeams, updateTeamInfo, onClose]);

  const handleCancel = React.useCallback(() => {
    setLocalTeams(teams);
    onClose();
  }, [teams, onClose]);

  const commonColors = [
    '#dc2626', // Red
    '#2563eb', // Blue
    '#16a34a', // Green
    '#ca8a04', // Yellow
    '#9333ea', // Purple
    '#ea580c', // Orange
    '#0891b2', // Cyan
    '#be185d', // Pink
    '#374151', // Gray
    '#000000', // Black
    '#ffffff', // White
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#ffffff', opacity: 1 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Team Customization</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {/* Team 1 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: localTeams.team1.kitColor }}
                />
                Team 1
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Team Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={localTeams.team1.name}
                    onChange={(e) => handleTeamChange('team1', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team 1"
                  />
                </div>

                {/* Kit Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kit Color
                  </label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {commonColors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleTeamChange('team1', 'kitColor', color)}
                        className={`w-8 h-8 rounded border-2 ${
                          localTeams.team1.kitColor === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={localTeams.team1.kitColor}
                    onChange={(e) => handleTeamChange('team1', 'kitColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                {/* GK Kit Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GK Kit Color
                  </label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {commonColors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleTeamChange('team1', 'gkKitColor', color)}
                        className={`w-8 h-8 rounded border-2 ${
                          localTeams.team1.gkKitColor === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={localTeams.team1.gkKitColor}
                    onChange={(e) => handleTeamChange('team1', 'gkKitColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Team 2 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: localTeams.team2.kitColor }}
                />
                Team 2
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Team Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={localTeams.team2.name}
                    onChange={(e) => handleTeamChange('team2', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team 2"
                  />
                </div>

                {/* Kit Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kit Color
                  </label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {commonColors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleTeamChange('team2', 'kitColor', color)}
                        className={`w-8 h-8 rounded border-2 ${
                          localTeams.team2.kitColor === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={localTeams.team2.kitColor}
                    onChange={(e) => handleTeamChange('team2', 'kitColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                {/* GK Kit Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GK Kit Color
                  </label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {commonColors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleTeamChange('team2', 'gkKitColor', color)}
                        className={`w-8 h-8 rounded border-2 ${
                          localTeams.team2.gkKitColor === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={localTeams.team2.gkKitColor}
                    onChange={(e) => handleTeamChange('team2', 'gkKitColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

TeamCustomizationModal.displayName = 'TeamCustomizationModal';

export default TeamCustomizationModal;