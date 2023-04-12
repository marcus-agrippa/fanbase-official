import React, { useState, useEffect } from 'react';
import TeamSelector from '../components/teams/TeamSelector';
import TeamData from '../components/teams/TeamData';
import TeamFixtures from '../components/teams/TeamFixtures';
import LeagueStandings from '../components/league/LeagueStandings';
import TeamResults from '../components/teams/TeamResults';
import NextFixture from '../components/teams/NextFixture';
import TeamNews from '../components/teams/TeamNews';
import InjuriesAndSuspensions from '../components/teams/InjuriesAndSuspensions';
import TopPerformers from '../components/teams/TopPerformers';
import TransferNews from '../components/teams/TransferNews';
import ManagerDetails from '../components/teams/ManagerDetails';


const API_KEY = '8dbd3d66a8791a6726eccd489d9ac404';
const BASE_URL = 'https://v3.football.api-sports.io';

const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 61, name: "Ligue 1" },
  { id: 78, name: "Bundesliga" },
  { id: 179, name: "SPL" },
];

const Home = () => {

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].id);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?league=${selectedLeague}&season=2022`,
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
    setSelectedTeam(''); // Reset the selected team when the league changes
  };

  const handleTeamSelect = (event) => {
    const teamId = event.target.value;
    setSelectedTeam(teamId);
  };

  return (
    <div className="App mx-4 sm:mx-12">
      <div className='flex align-center justify-center'>
        <label htmlFor="league-selector">Select a league:</label>
        <select
          id="league-selector"
          value={selectedLeague}
          onChange={handleLeagueSelect}
        >
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
        <label htmlFor="team-selector">Select a team:</label>
      <TeamSelector
        teams={teams}
        selectedTeam={selectedTeam}
        handleTeamSelect={handleTeamSelect}
        leagueId={selectedLeague}
      />
      </div>

      {selectedTeam && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamData teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamFixtures teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <TeamResults teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <NextFixture teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            <LeagueStandings leagueId={selectedLeague} season={2022} teamId={selectedTeam} />
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <TeamNews teamName={teams.find((team) => team.id === parseInt(selectedTeam)).name} />}
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <InjuriesAndSuspensions teamId={selectedTeam} season={2022} />}
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <TransferNews teamId={selectedTeam} />}
          </div>
          <div className="bg-gray-900 p-4 rounded shadow">
            {selectedTeam && <ManagerDetails teamId={selectedTeam} />}
          </div>
        </div>
      )}
      <p>
        <span className="inline-block w-4 h-4mr-2 my-4"></span>
        *Data is pulled from an external source and may not be 100% accurate. We are continually updating this app and the data received.
      </p>
    </div>
  );
}

export default Home;
