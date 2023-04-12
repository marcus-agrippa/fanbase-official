import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

async function fetchHeadToHeadStats(team1Id, team2Id) {
  const response = await fetch(`${BASE_URL}/fixtures/headtohead?h2h=${team1Id}-${team2Id}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
    },
  });
  return await response.json();
}

const HeadToHeadStats = ({ team1Id, team2Id }) => {
  const [headToHeadStats, setHeadToHeadStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchHeadToHeadStats(team1Id, team2Id);
        setHeadToHeadStats(data.response);
        setError(null);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    if (team1Id && team2Id) {
      fetchData();
    }
  }, [team1Id, team2Id]);

  if (loading) {
    return <p>Loading head to head stats...</p>;
  }

  if (error) {
    return <p>Error fetching head to head stats: {error.message}</p>;
  }

  if (!headToHeadStats || !headToHeadStats[0]) {
    return <p>No head to head stats available.</p>;
  }

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold my-4 text-center">Head-to-Head Statistics</h2>
      <ul>
        {headToHeadStats.slice(-5).map((fixture, index) => (
          <li key={index} className='flex items-center my-4'>
            <p className="hidden md:inline">{formatDate(fixture.fixture.date)}</p>
            <img src={fixture.teams.home.logo} alt="home logo" className="w-6 h-6 mx-2" />
              {fixture.teams.home.name} {fixture.goals.home} - {fixture.goals.away} {fixture.teams.away.name}<img src={fixture.teams.away.logo} alt="away logo" className="w-6 h-6 mx-2" />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadToHeadStats;
