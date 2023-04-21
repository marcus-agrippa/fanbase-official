// components/TopYellowCards.js
import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TopYellowCards = ({ leagueId }) => {
  const [topYellowCards, setTopYellowCards] = useState([]);

  useEffect(() => {
    const fetchTopYellowCards = async () => {
      try {
        const response = await fetch(`${BASE_URL}/players/topyellowcards?league=${leagueId}&season=2022`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_TOKEN,
          },
        });
        const data = await response.json();
        setTopYellowCards(data.response.slice(0, 10));
      } catch (error) {
        console.error('Error fetching top yellow cards:', error);
      }
    };

    fetchTopYellowCards();
  }, [leagueId]);

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Most Yellow Cards</h1>
    {topYellowCards.map((player, index) => (
      <div key={index}>
        <div className='flex flew-row justify-start items-center gap-2 p-4'>
          <img src={player?.player?.photo} alt="" className='w-12 h-12 rounded-full' />
          <img src={player?.statistics?.[0]?.team?.logo} alt="" className='w-7 h-7' />
          <p>
            {player?.player?.name} - {player?.statistics?.[0]?.team?.name}:{' '}
            - {player?.statistics?.[0]?.cards?.yellow} yellow cards
          </p>
        </div>
      </div>
    ))}
  </div>
  );
};

export default TopYellowCards;