import React from 'react'

const TeamSelector = ({ teams, selectedTeam, handleTeamSelect }) => (
  <select value={selectedTeam} onChange={handleTeamSelect}>
    <option value="">-- Select a team --</option>
    {teams.map(team => (
      <option key={team.id} value={team.id}>
        {team.name}
    </option>
    ))}
  </select>
);

export default TeamSelector;