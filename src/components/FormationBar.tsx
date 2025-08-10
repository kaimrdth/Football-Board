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
    <div className="flex items-center gap-8 min-w-fit bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/40">
      <FormationSelector 
        team="team1" 
        onFormationChange={handleFormationChange}
        teamInfo={teams.team1}
      />
      
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
      
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
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-md"
          style={{ background: teamInfo.kitColor }}
        />
        <span className="text-sm font-semibold text-gray-800 min-w-[4rem]">
          {teamInfo.name}
        </span>
      </div>
      
      <select
        className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md min-w-[100px] cursor-pointer"
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