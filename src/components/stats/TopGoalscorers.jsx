import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TopGoalscorers = ({ leagueId, season }) => {
  const [topGoalscorers, setTopGoalscorers] = useState([]);

  useEffect(() => {
    const fetchTopGoalscorers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/players/topscorers?league=${leagueId}&season=${season}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
          }
        });

        const data = await response.json();
        setTopGoalscorers(data.response);
      } catch (error) {
        console.error('Error fetching top goalscorers:', error);
      }
    };

    fetchTopGoalscorers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">Top Goalscorers</h2>
      <ul className="space-y-4">
        {topGoalscorers.map((player, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4">{index + 1}.</span>
              <img src={player.player.photo} alt="player photo" className="w-10 h-10 m-auto mr-4" />
              <span className="text-xl">{player.player.name}</span>
            </div>
            <span className="font-bold">{player.statistics[0].goals.total} goals</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGoalscorers;

