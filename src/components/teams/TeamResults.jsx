import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamResults = ({ teamId }) => {
  const [teamResults, setTeamResults] = useState([]);

  useEffect(() => {
    const fetchTeamResults = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/fixtures?team=${teamId}&last=5`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });
        const data = await response.json();
        setTeamResults(data.response);
      } catch (error) {
        console.error('Error fetching team results:', error);
      }
    };

    if (teamId) {
      fetchTeamResults(teamId);
    }
  }, [teamId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Recent League Results</h1>
      <ul className="space-y-6">
        {teamResults.map((result, index) => (
          <li key={index} className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 border-b-2 md:border-b-0">
            <div className="flex items-center">
              <img src={result.teams.home.logo} alt="home logo" className="w-7 h-7 m-auto mr-4" />
              <span className="text-lg md:text-xl mr-4">{result.teams.home.name}</span>
              <span className="font-bold text-lg md:text-xl">{result.goals.home}</span>
            </div>
            <div className="flex items-center pb-4 md:pb-0">
              <img src={result.teams.away.logo} alt="away logo" className="w-7 h-7 m-auto ml-4" />
              <span className="text-lg md:text-xl mr-4">{result.teams.away.name}</span>
              <span className="font-bold text-lg md:text-xl">{result.goals.away}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamResults;

