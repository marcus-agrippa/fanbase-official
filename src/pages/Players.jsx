// pages/Players.js
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SelectedTeamContext from '../context/SelectedTeamContext';
import TopScorers from '../components/players/TopScorers';
import TopAssists from '../components/players/TopAssists';
import TopShots from '../components/players/TopShots';
import TopPassers from '../components/players/TopPassers';
import TopRedCards from '../components/players/TopRedCards';
import TopYellowCards from '../components/players/TopYellowCards';


const Players = () => {
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
    <div>
      <h1 className="text-3xl font-bold text-white text-center my-10">League Statistics</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopScorers leagueId={leagueId} />
        </div>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopAssists leagueId={leagueId} />
        </div>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopShots leagueId={leagueId} />
        </div>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopPassers leagueId={leagueId} />
        </div>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopRedCards leagueId={leagueId} />
        </div>
        <div className='bg-gray-900 p-4 rounded shadow'>
          <TopYellowCards leagueId={leagueId} />
        </div>
      </div>
    </div>
  );
};

export default Players;

