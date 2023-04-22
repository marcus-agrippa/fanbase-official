import { createContext, useState } from 'react';

const SelectedTeamContext = createContext();

export const SelectedTeamProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState('');
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
