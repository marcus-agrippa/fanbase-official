import React, { useEffect, useState } from 'react';
import TeamGoalDistributionChart from '../stats/TeamGoalDistributionChart';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamStatistics = ({ teamId, leagueId }) => {
  const [teamStats, setTeamStats] = useState(null);

  useEffect(() => {
    const fetchTeamStatistics = async () => {
      try {
        const response = await fetch(`${BASE_URL}/teams/statistics?season=2023&team=${teamId}&league=${leagueId}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_TOKEN,
          },
        });
        const data = await response.json();
        setTeamStats(data.response);
      } catch (error) {
        console.error('Error fetching team statistics:', error);
      }
    };

    fetchTeamStatistics();
  }, [teamId, leagueId]);

  return (
    <div>
      {teamStats ? (
        <div className='bg-dark-1 text-white p-4 rounded-lg'>
          <h1 className="text-3xl font-bold text-center text-white my-4">Team Stats</h1>
          {/* <p>Season: {teamStats.league.season}</p>
          <p>League: {teamStats.league.name}</p>
          <p>Country: {teamStats.league.country}</p>
          <p>Form: {teamStats.form}</p>
          <p>Wins Home {teamStats.fixtures.wins.home}</p>
          <p>Wins Away {teamStats.fixtures.wins.away}</p>
          <p>Draws Home {teamStats.fixtures.wins.home}</p>
          <p>Draw Away {teamStats.fixtures.wins.away}</p>
          <p>Losses Home {teamStats.fixtures.wins.home}</p>
          <p>Losses Away {teamStats.fixtures.wins.away}</p>
          <p>Goals Against Total Avg. {teamStats.goals.against.average.total}</p>
          <p>Goals Against Home Avg. {teamStats.goals.against.average.home}</p>
          <p>Goals Against Away Avg. {teamStats.goals.against.average.away}</p>
          <p>Goals For Total Avg. {teamStats.goals.against.average.total}</p>
          <p>Goals For Home Avg. {teamStats.goals.against.average.home}</p>
          <p>Goals For Away Avg. {teamStats.goals.against.average.away}</p>
          <TeamStatisticsGoalsChart teamStats={teamStats} /> */}
          <TeamGoalDistributionChart goalDistribution={teamStats} />
        </div>
      ) : (
        <p>Loading team statistics...</p>
      )}
    </div>
  );
};

export default TeamStatistics;

