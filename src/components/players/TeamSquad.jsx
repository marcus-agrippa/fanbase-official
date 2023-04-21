// components/TeamSquad.js
import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamSquad = ({ teamId }) => {
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const response = await fetch(`${BASE_URL}/players/squads?team=${teamId}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_TOKEN,
          },
        });
        const data = await response.json();
        setSquad(data.response);
      } catch (error) {
        console.error('Error fetching team squad:', error);
      }
    };

    fetchSquad();
  }, [teamId]);

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Team Squad</h1>
      {squad.map((player, index) => (
        <div key={index}>
          <p>
            {player?.players[0]?.name} - ({player?.players[0]?.number}) - {player?.team?.name}:{' '}  -({player?.players[0]?.position})
          </p>
          <img src={player?.players[0]?.photo} alt="" className='w-14 h-14' />
        </div>
      ))}
    </div>
  );
};

export default TeamSquad;