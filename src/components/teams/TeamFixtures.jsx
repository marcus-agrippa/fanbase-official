import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamFixtures = ({ teamId }) => {
  const [teamFixtures, setFixtureData] = useState([]);
  const [fixturesToShow, setFixturesToShow] = useState(5);
  const [showMoreButtonClicked, setShowMoreButtonClicked] = useState(false);

  useEffect(() => {
    const fetchTeamFixtures = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/fixtures?season=2023&team=${teamId}`, {
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

  const isDateTodayOrTomorrow = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const date = new Date(dateString);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return false;
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format without leading zero
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${amPm}`;
  };

  const handleLoadMoreFixtures = () => {
    setFixturesToShow(fixturesToShow + 5);
    setShowMoreButtonClicked(true);
  };

  const handleShowLessFixtures = () => {
    setFixturesToShow(5);
    setShowMoreButtonClicked(false); // Add this line
  };

  // Filter fixtures to only include upcoming fixtures
  const upcomingFixtures = teamFixtures.filter(fixture => new Date(fixture.fixture.date) >= new Date());

  const shortenTeamName = (teamName) => {
    const nameParts = teamName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 3).toUpperCase();
    } else if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1].slice(0, 2)).toUpperCase();
    }
    return teamName.toUpperCase();
  };

  return (
<div className="bg-dark-1 text-white p-4 rounded-lg">
  <h1 className="text-3xl font-bold text-center my-4">Upcoming Fixtures</h1>
  <h6 className='text-center'>All Competitions (Local Time)</h6>
  <ul className="space-y-10 mt-10">
    {upcomingFixtures.slice(0, fixturesToShow).map((fixture, index) => (
      <li key={index} className="flex items-center justify-center space-y-2 flex-row space-y-0 bg-gray-800 rounded-lg">
        <div className='flex flex-col'>
        <h3 className="text-xl my-2 text-center">
          <span className="hidden md:inline">{formatDisplayDate(fixture.fixture.date)} |</span>
          <span className="md:hidden">{formatDisplayDate(fixture.fixture.date)}</span>
          <span className="block md:inline"> {formatTime(fixture.fixture.date)}</span>
        </h3>
          <div className="flex justify-center items-center">
            <h4 className="text-sm px-2 py-1 inline-block bg-accent my-3">{fixture.league.name}</h4>
          </div>
          <div className='flex justify-center items-center my-3'>
            <div className="flex items-center">
              <span className="text-lg text-xl mr-2">{shortenTeamName(fixture.teams.home.name)}</span>
              <img src={fixture.teams.home.logo} alt="home logo" className="w-10 h-10 m-auto" />
            </div>
            <span className="text-white font-bold text-xl p-3 w-16 text-center">vs</span>
            <div className="flex items-center">
              <img src={fixture.teams.away.logo} alt="away logo" className="w-10 h-10 m-auto" />
              <span className="text-lg text-xl ml-2">{shortenTeamName(fixture.teams.away.name)}</span>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
  {fixturesToShow < upcomingFixtures.length && !showMoreButtonClicked && (
  <button onClick={handleLoadMoreFixtures} className="bg-indigo-500 text-white py-2 px-4 rounded mt-10 block mx-auto">
    More Fixtures
  </button>
    )}
    {showMoreButtonClicked && (
      <button onClick={handleShowLessFixtures} className="bg-indigo-500 text-white py-2 px-4 rounded mt-10 block mx-auto">
        Show Less
      </button>
    )}
  </div>

  );
};

export default TeamFixtures;


