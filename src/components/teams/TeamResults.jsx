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

  const shortenTeamName = (teamName) => {
    const nameParts = teamName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 3).toUpperCase();
    } else if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1].slice(0, 2)).toUpperCase();
    }
    return teamName.toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Recent Results</h1>
      <ul className="space-y-6 mt-10">
        {teamResults.map((result, index) => (
          <li key={index} className="flex items-center justify-center space-y-2 flex-row space-y-0">
            <div className="flex items-center">
              <span className="text-lg text-xl mr-3">{shortenTeamName(result.teams.home.name)}</span>
              <img src={result.teams.home.logo} alt="home logo" className="w-7 h-7 m-auto mr-3" />
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 text-white font-bold text-lg md:text-xl p-1 border-r-2 border-blue-300 w-8 text-center">
                {result.goals.home}
              </div>
              <div className="bg-blue-500 text-white font-bold text-lg md:text-xl p-1 w-8 text-center">
                {result.goals.away}
              </div>
            </div>
            <div className="flex items-center">
              <img src={result.teams.away.logo} alt="away logo" className="w-7 h-7 m-auto ml-3 mr-3" />
              <span className="text-lg text-xl mr-3">{shortenTeamName(result.teams.away.name)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamResults;

