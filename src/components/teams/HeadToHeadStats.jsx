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

async function fetchPrediction(fixtureId) {
  const response = await fetch(`${BASE_URL}/predictions?fixture=${fixtureId}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
    },
  });
  return await response.json();
}

const HeadToHeadStats = ({ team1Id, team2Id, fixtureID }) => {
  const [headToHeadStats, setHeadToHeadStats] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, predictionData] = await Promise.all([
          fetchHeadToHeadStats(team1Id, team2Id),
          fetchPrediction(fixtureID), // Use the fixtureID prop here
        ]);
        setHeadToHeadStats(statsData.response);
        setPrediction(predictionData.response[0].predictions);
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
    return <p>Error fetching data: {error.message}</p>;
  }

  if (!headToHeadStats || !headToHeadStats[0] || !prediction) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <div className="bg-dark-1 text-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold my-4 text-center">H2H</h2>
        <ul>
          {headToHeadStats.slice(-5).map((fixture, index) => (
            <li key={index} className="flex items-center justify-center my-1">
              <img src={fixture.teams.home.logo} alt="home logo" className="w-6 h-6 mx-2" />
              {fixture.goals.home} - {fixture.goals.away}
              <img src={fixture.teams.away.logo} alt="away logo" className="w-6 h-6 mx-2" />
              <hr />
              <p className="my-5">{formatDate(fixture.fixture.date)}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* <img src={headToHeadStats.teams.home.logo} alt="home logo" className="w-6 h-6 mx-2" /> */}
      <div className="bg-dark-1 text-white p-4 rounded-lg">
        <h4 className="text-2xl font-bold my-4 text-center">Who Will Win?</h4>
        <div className="flex flex-row items-center justify-center">
          <div className="flex items-center justify-center flex-col w-1/3 mx-2">
            <span className='my-2'>Home</span>
            <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center">
              {prediction.percent.home}
            </div>
          </div>
          <div className="flex items-center justify-center flex-col w-1/3 mx-2">
            <span className='my-2'>Draw</span>
            <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center">
              {prediction.percent.draw}
            </div>
          </div>
          <div className="flex items-center justify-center flex-col w-1/3 mx-2">
            <span className='my-2'>Away</span>
            <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center">
              {prediction.percent.away}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadToHeadStats;

