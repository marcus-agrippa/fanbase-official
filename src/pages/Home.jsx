import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectedTeamContext from '../context/SelectedTeamContext';
import TeamSelector from '../components/teams/TeamSelector';
import TeamData from '../components/teams/TeamData';
import TeamFixtures from '../components/teams/TeamFixtures';
import LeagueStandings from '../components/league/LeagueStandings';
import TeamResults from '../components/teams/TeamResults';
import NextFixture from '../components/teams/NextFixture';
import InjuriesAndSuspensions from '../components/teams/InjuriesAndSuspensions';
import TransferNews from '../components/teams/TransferNews';
import ManagerDetails from '../components/teams/ManagerDetails';
import TeamStatistics from '../components/teams/TeamStatistics';

const leagues = [
  { id: 39, name: "Premier League" },
  { id: 40, name: "English Championship" },
  { id: 140, name: "Spanish La Liga" },
  { id: 135, name: "Italian Serie A" },
  { id: 61, name: "French Ligue 1" },
  { id: 78, name: "German Bundesliga" },
  { id: 179, name: "Scottish Premiership" },
  { id: 88, name: "Dutch Eredivisie" },
  { id: 94, name: "Liga Portugal" },
  { id: 144, name: "Belgian Pro League" },
  { id: 210, name: "Croation Football League" },
  { id: 203, name: "Turkish Süper Lig" },
];

const Home = ({ setLeagueId, setTeamId }) => {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const { selectedLeague, setSelectedLeague, selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);

  // Check if there are selected league and team values in local storage
  useEffect(() => {
    const storedLeagueId = localStorage.getItem("selectedLeague");
    if (storedLeagueId) {
      setSelectedLeague(storedLeagueId);
    }

    const storedTeamId = localStorage.getItem("selectedTeam");
    if (storedTeamId) {
      setSelectedTeam(storedTeamId);
    }

    setLoading(false); // Set loading to false when data is loaded
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?league=${selectedLeague}&season=2023`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `8dbd3d66a8791a6726eccd489d9ac404`,
            },
          }
        );

        const data = await response.json();
        const teamsArray = data.response.map((item) => item.team);
        setTeams(teamsArray);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [selectedLeague]);

  const handleLeagueSelect = (event) => {
    const leagueId = event.target.value;
    setSelectedLeague(leagueId);
    localStorage.setItem("selectedLeague", leagueId); // Save the value to local storage
  };

  const handleTeamSelect = (event) => {
    const teamId = parseInt(event.target.value);
    setSelectedTeam(teamId);
    localStorage.setItem("selectedTeam", teamId); // Save the value to local storage
  };

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedLeague,
        selectedTeam,
        setSelectedLeague,
        setSelectedTeam,
      }}
    >
    <div className="App mx-4 sm:mx-12">
      <div className='flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4'>
      <label htmlFor="league-selector" className="text-sm md:text-base">Select a league:</label>
      <select
        id="league-selector"
        value={selectedLeague}
        onChange={handleLeagueSelect}
        className="bg-white text-black text-sm md:text-base p-1 rounded-md"
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
      </select>
      <label htmlFor="team-selector" className="text-sm md:text-base">Select a team:</label>
      {teams.length > 0 && ( 
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              handleTeamSelect={handleTeamSelect}
              leagueId={selectedLeague}
            />
      )}
    </div>

      {selectedTeam && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:w-[90vw] gap-4 mt-4">
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamData teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <NextFixture teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamStatistics teamId={selectedTeam} leagueId={selectedLeague} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <LeagueStandings leagueId={selectedLeague} season={2023} teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamFixtures teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamResults teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <InjuriesAndSuspensions teamId={selectedTeam} season={2023} />}
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <TransferNews teamId={selectedTeam} />}
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <ManagerDetails teamId={selectedTeam} />}
          </div>
          {selectedTeam && (
            <div className='m-auto'>
              <button
                onClick={() =>
                  navigate(`/players?leagueId=${selectedLeague}&teamId=${selectedTeam}`)
                }
                className="text-white bg-blue-500 px-4 mr-4 py-2 rounded-md mt-6"
              >
                Go to Players Page
              </button>
              <button
                onClick={() =>
                  navigate(`/league?leagueId=${selectedLeague}&teamId=${selectedTeam}`)
                }
                className="text-white bg-blue-500 px-4 py-2 rounded-md mt-6"
              >
                Go to League Page
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </SelectedTeamContext.Provider>
  );
}

export default Home;
