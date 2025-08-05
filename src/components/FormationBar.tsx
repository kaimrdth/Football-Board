import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { FormationType, Team } from '../types';
import { getFormationName } from '../utils/formations';

const FormationBar = React.memo(() => {
  const { setFormation, teams } = useGameStore();

  const handleFormationChange = React.useCallback(
    (team: Team, formation: FormationType) => {
      setFormation(team, formation);
    },
    [setFormation]
  );

  return (
    <div className="flex items-center gap-6 min-w-fit">
      <FormationSelector 
        team="team1" 
        onFormationChange={handleFormationChange}
        teamInfo={teams.team1}
      />
      
      <div className="w-px h-6 bg-gray-300" />
      
      <FormationSelector 
        team="team2" 
        onFormationChange={handleFormationChange}
        teamInfo={teams.team2}
      />
    </div>
  );
});

interface FormationSelectorProps {
  team: Team;
  onFormationChange: (team: Team, formation: FormationType) => void;
  teamInfo: { name: string; kitColor: string };
}

const FormationSelector = React.memo(({ team, onFormationChange, teamInfo }: FormationSelectorProps) => {
  const formations: FormationType[] = ['4-4-2', '4-3-3', '3-5-2', '5-3-2', '4-2-3-1'];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full border border-white/30"
          style={{ background: teamInfo.kitColor }}
        />
        <span className="text-sm font-medium text-gray-700 min-w-[4rem]">
          {teamInfo.name}
        </span>
      </div>
      
      <select
        className="bg-white/80 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-colors min-w-[80px]"
        onChange={(e) => onFormationChange(team, e.target.value as FormationType)}
        defaultValue={team === 'team1' ? '4-4-2' : '4-3-3'}
      >
        {formations.map(formation => (
          <option key={formation} value={formation}>
            {getFormationName(formation)}
          </option>
        ))}
      </select>
    </div>
  );
});

FormationSelector.displayName = 'FormationSelector';
FormationBar.displayName = 'FormationBar';

export default FormationBar;