import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import LeagueStandings from '../components/league/LeagueStandings';
import LeagueResults from '../components/league/LeagueResults';
import LeagueFixtures from '../components/league/LeagueFixtures';
import SelectedTeamContext from '../context/SelectedTeamContext';

const League = () => {
  const location = useLocation();
  const { selectedLeague, selectedTeam } = useContext(SelectedTeamContext);
  const urlSearchParams = new URLSearchParams(location.search);
  const leagueIdFromUrl = urlSearchParams.get('leagueId');
  const teamIdFromUrl = urlSearchParams.get('teamId');
  const [leagueId, setLeagueId] = useState(selectedLeague || localStorage.getItem("selectedLeague"));
  const [teamId, setTeamId] = useState(selectedTeam || localStorage.getItem("selectedTeam"));

  useEffect(() => {
    if (selectedLeague) {
      setLeagueId(selectedLeague);
    } else if (leagueIdFromUrl) {
      setLeagueId(leagueIdFromUrl);
    }

    if (selectedTeam) {
      setTeamId(selectedTeam);
    } else if (teamIdFromUrl) {
      setTeamId(teamIdFromUrl);
    }

    console.log('leagueId:', leagueId);
    console.log('teamId:', teamId);
  }, [selectedLeague, selectedTeam, leagueIdFromUrl, teamIdFromUrl]);

  return (
    <div className='w-[90vw]'>
      <h1 className="text-3xl font-bold text-white text-center my-10">League Overview</h1>
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4 mt-4'>
        <div className="bg-gray-900 p-4 rounded shadow">
          <LeagueStandings leagueId={selectedLeague} season={2023} teamId={selectedTeam} />
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <LeagueFixtures leagueId={selectedLeague} season={2023} teamId={selectedTeam} />
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <LeagueResults leagueId={selectedLeague} season={2023} teamId={selectedTeam} />
        </div>
      </div>
    </div>
  )
}

export default League