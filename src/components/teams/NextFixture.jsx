import React, { useState, useEffect } from 'react';
import HeadToHeadStats from './HeadToHeadStats';

const BASE_URL = 'https://v3.football.api-sports.io';

const NextFixture = ({ teamId }) => {
  const [nextFixture, setNextFixture] = useState(null);

  useEffect(() => {
    const fetchNextFixture = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/fixtures?team=${teamId}&next=1`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });
        const data = await response.json();
        setNextFixture(data.response[0]);
      } catch (error) {
        console.error('Error fetching next fixture:', error);
      }
    };

    if (teamId) {
      fetchNextFixture(teamId);
    }
  }, [teamId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format without leading zero
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}-${month}-${year}, ${hours}:${minutes} ${amPm}`;
  };

  if (!nextFixture) {
    return <p>Loading next fixture...</p>;
  }

  if (!nextFixture || !nextFixture.teams.home || !nextFixture.teams.away) {
    return <p>Loading next fixture...</p>;
  }

  const homeTeamId = nextFixture.teams.home.id;
  const awayTeamId = nextFixture.teams.away.id;

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Next Fixture</h1>
      <div className="flex justify-center items-center mb-4">
        <img src={nextFixture.teams.home.logo} alt="home logo" className="w-10 h-10 m-auto mr-4" />
        <p className="text-xl">
          {nextFixture.teams.home.name} vs {nextFixture.teams.away.name}
        </p>
        <img src={nextFixture.teams.away.logo} alt="away logo" className="w-10 h-10 m-auto ml-4" />
      </div>
      <div className='text-center'>
        <p className='my-5'><span className='text-accent mr-2'></span>{nextFixture.league.name}</p>
        <p className='my-5'><span className='text-accent mr-2'></span>{nextFixture.league.round}</p>
        <p className='my-5'><span className='text-accent mr-2'>Date/Time:</span>{formatDate(nextFixture.fixture.date)}</p>
        <p className='my-5'><span className='text-accent mr-2'>Venue:</span>{nextFixture.fixture.venue.name}</p>
        <p className='my-5'>
          <span className='text-accent mr-2'>Referee:</span>
          {nextFixture.fixture.referee ? nextFixture.fixture.referee : 'TBC'}
        </p>
      </div>
      <div className='flex justify-center'>
      <HeadToHeadStats team1Id={homeTeamId} team2Id={awayTeamId} />
      </div>   
    </div>
  );
  
};

export default NextFixture;
