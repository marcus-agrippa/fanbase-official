import React from 'react'

const TeamSelector = ({ teams, selectedTeam, handleTeamSelect }) => (
  <select value={selectedTeam} onChange={handleTeamSelect} className='bg-white text-black text-sm md:text-base bg-white p-1 rounded-md'>
    <option value="">-- Select a team --</option>
    {teams.map(team => (
      <option key={team.id} value={team.id}>
        {team.name}
    </option>
    ))}
  </select>
);

export default TeamSelector;