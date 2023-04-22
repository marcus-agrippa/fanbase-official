import { createContext, useState } from 'react';

const SelectedTeamContext = createContext();

export const SelectedTeamProvider = ({ children }) => {
  const leagues = [
    { id: 39, name: "Premier League" },
    { id: 140, name: "La Liga" },
    { id: 135, name: "Serie A" },
    { id: 61, name: "Ligue 1" },
    { id: 78, name: "Bundesliga" },
    { id: 179, name: "SPL" },
  ];

  const [selectedLeague, setSelectedLeague] = useState(leagues[0].id);
  const [selectedTeam, setSelectedTeam] = useState('');

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedLeague,
        selectedTeam,
        setSelectedLeague,
        setSelectedTeam,
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
};

export default SelectedTeamContext;
