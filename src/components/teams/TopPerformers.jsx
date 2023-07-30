import React, { useState, useEffect } from 'react';

const TopPerformers = ({ teamId }) => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [teamTotalGames, setTeamTotalGames] = useState(0);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/players?team=${teamId}&season=2023`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '8dbd3d66a8791a6726eccd489d9ac404',
          },
        });

        const data = await response.json();
        const playersWithStats = data.response.filter((player) => player.statistics.length > 0);
        const sortedPlayers = playersWithStats.sort((a, b) => parseFloat(b.statistics[0].rating) - parseFloat(a.statistics[0].rating));
        setTopPerformers(sortedPlayers);
      } catch (error) {
        console.error('Error fetching top performers:', error);
      }
    };

    const fetchTeamTotalGames = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/standings?team=${teamId}&season=2023&league=39`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '8dbd3d66a8791a6726eccd489d9ac404',
          },
        });

        const data = await response.json();
        const teamStandings = data.response[0]?.league?.standings[0].find((standing) => standing.team.id === parseInt(teamId));
        if (teamStandings) {
          setTeamTotalGames(teamStandings.played);
        }
      } catch (error) {
        console.error('Error fetching team total games:', error);
      }
    };

    fetchTopPerformers();
    fetchTeamTotalGames();
  }, [teamId]);

  const minAppearances = Math.ceil((teamTotalGames * 50) / 100);

  const filteredPerformers = topPerformers.filter((player) => {
    return player.statistics[0]?.appearances >= minAppearances;
  });

  return (
    <div>
      <h2 className="text-white text-xl mb-2">Top Performers</h2>
      <ul>
        {filteredPerformers.map((player, index) => (
          <li key={player.player.id} className="text-white">
            {index + 1}. {player.player.name} - Rating: {player.statistics[0]?.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPerformers;





