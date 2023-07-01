// components/TopAssists.js
import React, { useState, useEffect } from 'react';
import teamColors from '../teams/teamColours';

const BASE_URL = 'https://v3.football.api-sports.io';

const TopAssists = ({ leagueId }) => {
  const [topAssists, setTopAssists] = useState([]);

  useEffect(() => {
    const fetchTopAssists = async () => {
      try {
        const response = await fetch(`${BASE_URL}/players/topassists?league=${leagueId}&season=2022`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_TOKEN,
          },
        });
        const data = await response.json();
        setTopAssists(data.response.slice(0, 10));
      } catch (error) {
        console.error('Error fetching top assists:', error);
      }
    };

    fetchTopAssists();
  }, [leagueId]);

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
      <h1 className="text-3xl font-bold text-center my-4">Assists</h1>
      {topAssists.map((player, index) => (
        <div key={index} className={`p-4 ${index === 0 ? (teamColors[player?.statistics?.[0]?.team?.name] || 'bg-blue-500') + ' rounded-lg' : ''}`}>
          <div className="flex flew-row justify-start items-center gap-2">
            <span className="font-bold text-lg md:text-xl mr-4">
              {index + 1}.
            </span>
            {index === 0 && (
              <img
                src={player?.player?.photo}
                alt=""
                className="hidden sm:block w-12 h-12 rounded-full mr-4"
              />
            )}
            <div className="flex items-center">
              <img
                src={player?.statistics?.[0]?.team?.logo}
                alt=""
                className="w-7 h-7 mr-4"
              />
              <div>
                <span className="font-semibold">{player?.player?.name}</span>
                <div className="text-xs font-semibold text-gray-300">
                  {shortenTeamName(player?.statistics?.[0]?.team?.name)}
                </div>
              </div>
            </div>
            <span className="ml-auto font-semibold">
              {player?.statistics?.[0]?.goals?.assists} assists
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopAssists;