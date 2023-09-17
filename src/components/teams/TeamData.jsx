import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamData = ({ teamId }) => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchTeamData = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/teams?id=${teamId}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
        }
      })
        const data = await response.json();
        const teamsDataArray = data.response.map(item => item); // Extract the team objects from the response array
        setTeamData(teamsDataArray[0]);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    if (teamId) {
      fetchTeamData(teamId);
    }
  }, [teamId]);

  if (!teamData) {
    return <p>Please select a team.</p>;
  }

  return (
    <div className='bg-dark-1 text-white p-4 rounded-lg text-center'>
      <h1 className='text-3xl font-bold text-center my-4'>{teamData.team.name}</h1>
      <img src={teamData.team.logo} alt="logo" className='w-24 h-24 md:w-15 md:h-15 m-auto my-5' />
      <p className='my-4'><span className='text-accent mr-2'>Country:</span> {teamData.team.country}</p>
      <p className='my-4'><span className='text-accent mr-2'>City:</span> {teamData.venue.city}</p>
      <p className='my-4'><span className='text-accent mr-2'>Founded:</span> {teamData.team.founded}</p>
      <p className='my-4'><span className='text-accent mr-2'>Ground:</span> {teamData.venue.name}</p>
      <p className='my-4'><span className='text-accent mr-2'>Capacity:</span> {teamData.venue.capacity}</p>
    </div>
  );
};

export default TeamData;







