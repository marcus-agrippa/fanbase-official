import { createContext, useState, useEffect } from 'react';

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

  // Initialize selectedLeague and selectedTeam states with values from local storage
  const [selectedLeague, setSelectedLeague] = useState(() => {
    const storedLeagueId = localStorage.getItem("selectedLeague");
    return storedLeagueId ? parseInt(storedLeagueId) : leagues[0].id;
  });

  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    // Update local storage when selectedLeague changes
    localStorage.setItem("selectedLeague", selectedLeague.toString());
  }, [selectedLeague]);

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
