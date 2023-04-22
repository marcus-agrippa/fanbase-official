import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamFixtures = ({ teamId }) => {
  const [teamFixtures, setFixtureData] = useState([]);
  const [fixturesToShow, setFixturesToShow] = useState(5);

  useEffect(() => {
    const fetchTeamFixtures = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/fixtures?season=2022&team=${teamId}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
        }
      })
        const data = await response.json();
        const teamFixtureArray = data.response.map(item => item); // Extract the fixture objects from the response array
        setFixtureData(teamFixtureArray);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    if (teamId) {
      fetchTeamFixtures(teamId);
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

  const handleLoadMoreFixtures = () => {
    setFixturesToShow(fixturesToShow + 5);
  };

  // Filter fixtures to only include upcoming fixtures
  const upcomingFixtures = teamFixtures.filter(fixture => new Date(fixture.fixture.date) >= new Date());

  return (
<div className="bg-dark-1 text-white p-4 rounded-lg">
  <h1 className="text-3xl font-bold text-center my-4">Upcoming Fixtures</h1>
  <ul className="space-y-10">
    {upcomingFixtures.slice(0, fixturesToShow).map((fixture, index) => (
      <li key={index} className="flex items-center justify-center space-y-2 flex-col md:space-y-0">
        <div className='flex flex-row'>
          <div className="flex items-center flex-row">
            <img src={fixture.teams.home.logo} alt="home logo" className="w-10 h-10 m-auto md:mr-4" />
            {/* <span className="text-lg md:text-xl">{fixture.teams.home.name}</span> */}
          </div>
          <span className="mx-2 text-lg md:text-xl">vs</span>
          <div className="flex items-center flex-row">
            {/* <span className="text-lg md:text-xl">{fixture.teams.away.name}</span> */}
            <img src={fixture.teams.away.logo} alt="away logo" className="w-10 h-10 m-auto md:ml-4 md:mr-4" />
          </div>
        </div>
        <p className="text-sm pt-5 md:text-base">{formatDate(fixture.fixture.date)}</p>
      </li>
    ))}
  </ul>
  {fixturesToShow < upcomingFixtures.length && (
    <button onClick={handleLoadMoreFixtures} className="bg-indigo-500 text-white px-4 py-2 rounded mt-4 block mx-auto">
      More Fixtures
    </button>
  )}
</div>

  );
};

export default TeamFixtures;


