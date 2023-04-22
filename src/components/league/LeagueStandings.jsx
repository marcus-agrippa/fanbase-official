import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const LeagueStandings = ({ leagueId, season, teamId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/standings?league=${leagueId}&season=${season}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });

        const data = await response.json();
        if (data && data.response && data.response[0] && data.response[0].league && data.response[0].league.standings) {
          setStandings(data.response[0].league.standings[0]);
        } else {
          console.error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    if (leagueId && season) {
      fetchStandings();
    }
  }, [leagueId, season]);

  useEffect(() => {
    if (teamId) {
      // Force a re-render when teamId changes
      setStandings([...standings]);
    }
  }, [teamId]);

  const shortenTeamName = (teamName) => {
    const nameParts = teamName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 3).toUpperCase();
    } else if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1].slice(0, 2)).toUpperCase();
    }
    return teamName.toUpperCase();
  };
  
  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">League Standings</h1>
      <div className="overflow-x-auto mt-10">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-dark-2">
              <th className="py-2">Pos</th>
              <th className="py-2">Club</th>
              <th className="py-2">Pl</th>
              <th className="hidden sm:table-cell py-2">W</th>
              <th className="hidden sm:table-cell py-2">D</th>
              <th className="hidden sm:table-cell py-2">L</th>
              <th className="py-2">GD</th>
              <th className="py-2 text-accent">Pts</th>
              <th className="py-2">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } ${team.team.id === parseInt(teamId) ? "bg-indigo-500" : ""} ${(leagueId === "39" || leagueId === "140" || leagueId === "135" || leagueId === "61") && team.rank <= 4
                    ? "border-l-4 border-blue-500"
                    : leagueId === "78" && team.rank <= 3
                      ? "border-l-4 border-blue-500"
                      : ""
                  } ${(leagueId === "39" || leagueId === "140" || leagueId === "135") && team.rank >= standings.length - 2
                    ? "border-l-4 border-red-500"
                    : leagueId === "61" && team.rank >= standings.length - 3
                      ? "border-l-4 border-red-500"
                      : leagueId === "78" && team.rank > standings.length - 2
                        ? "border-l-4 border-red-500"
                        : leagueId === "78" && team.rank === standings.length - 2
                          ? "border-l-4 border-orange-500"
                          : ""
                  } ${(leagueId === "39" || leagueId === "140" || leagueId === "135") && team.rank === 5
                    ? "border-l-4 border-green-500"
                    : leagueId === "61" && team.rank === 5
                      ? "border-l-4 border-green-500"
                      : leagueId === "78" && team.rank === 4
                        ? "border-l-4 border-green-500"
                        : ""
                  }`}
              >
                <td className="py-2 text-center">{team.rank}</td>
                <td className="py-2 flex items-center justify-center">
                  <img src={team.team.logo} alt="team logo" className="w-6 h-6 mr-2" />
                  {shortenTeamName(team.team.name)}
                </td>
                <td className="py-2 text-center">{team.all.played}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.win}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.draw}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.lose}</td>
                <td className="py-2 text-center">{team.goalsDiff}</td>
                <td className="py-2 text-center text-accent">{team.points}</td>
                <td className="py-2 text-center">{team.form}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className="mt-4">
        <p>
          <span className="inline-block w-4 h-4 border-l-4 border-blue-500 mr-2"></span>
          Champions League Group Stage
        </p>
        <p>
          <span className="inline-block w-4 h-4 border-l-4 border-green-500 mr-2"></span>
          Europa League Group Stage
        </p>
        <p>
          <span className="inline-block w-4 h-4 border-l-4 border-red-500 mr-2"></span>
          Relegation
        </p>
      </div>
    </div>
  );
};

export default LeagueStandings;
