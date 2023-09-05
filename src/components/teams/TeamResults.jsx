import React, { useState, useEffect } from 'react';
import { GiSoccerBall } from 'react-icons/gi';
import { TbRectangleVertical } from 'react-icons/tb';

const BASE_URL = 'https://v3.football.api-sports.io';

const TeamResults = ({ teamId }) => {
  const [teamResults, setTeamResults] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

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
        const sortedResults = data.response.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));
        setTeamResults(sortedResults);
      } catch (error) {
        console.error('Error fetching team results:', error);
      }
    };

    if (teamId) {
      fetchTeamResults(teamId);
    }
  }, [teamId]);

  const toggleMatchDetails = async (index, fixtureId) => {
    if (selectedMatch === index) {
      setSelectedMatch(null);
    } else {
      try {
        const response = await fetch(`${BASE_URL}/fixtures/events?fixture=${fixtureId}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });
        const eventData = await response.json();
        setTeamResults((prevResults) => {
          const updatedResults = [...prevResults];
          updatedResults[index].events = eventData.response;
          return updatedResults;
        });
        setSelectedMatch(index);
      } catch (error) {
        console.error('Error fetching match events:', error);
      }
    }
  };

  const shortenTeamName = (teamName) => {
    const nameParts = teamName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 3).toUpperCase();
    } else if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1].slice(0, 2)).toUpperCase();
    }
    return teamName.toUpperCase();
  };

  const isDateTodayOrYesterday = (dateString) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    const date = new Date(dateString);
  
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
  
    return false;
  };
  
  const formatDate = (dateString) => {
    const isTodayOrYesterday = isDateTodayOrYesterday(dateString);
    if (isTodayOrYesterday) {
      return isTodayOrYesterday;
    }
  
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  
    return date.toLocaleDateString(undefined, options);
  };

  const renderMatchDetails = (match, index) => {
    if (selectedMatch === index && match.events) {
      // Filter out substitution events
      const nonSubstitutionEvents = match.events.filter(event => event.type !== 'subst');
      
      return (
        <div className='py-5'>
          <ul>
            {nonSubstitutionEvents.map((event, eventIndex) => (
              <li
                key={eventIndex}
                className={` ${
                  event.team.id === match.teams.home.id ? 'text-left' : 'text-right'
                }`}
              >
                {event.time.elapsed}' - {' '}
                {event.type === 'Goal' && (
                  <div className="inline">
                    <span className='font-bold'>
                      <GiSoccerBall color="white" className="inline" /> {event.player.name}
                    </span>
                    {event.assist && event.assist.name && (
                      <div style={{ display: 'block' }}>
                        (assist {event.assist.name})
                      </div>
                    )}
                  </div>
                )}
                {event.type === 'Card' && event.detail === 'Yellow Card' && (
                  <span>
                    <TbRectangleVertical color="yellow" fill='yellow' className='inline' /> {event.player.name} 
                  </span>
                )}
                {event.type === 'Card' && event.detail === 'Red Card' && (
                  <span>
                    <TbRectangleVertical color="red" fill='red' className='inline' /> {event.player.name} 
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Recent Results</h1>
      <ul className="space-y-10 mt-10">
        {teamResults.map((result, index) => (
          <li key={index} className="flex items-center justify-center space-y-2 flex-row space-y-0 bg-gray-800 rounded-lg">
            <div className='flex flex-col'>
              <h3 className="text-xl my-3 text-center">{formatDate(result.fixture.date)}</h3>
              <div className="flex justify-center items-center">
                <h4 className="text-sm px-2 py-1 inline-block bg-accent my-3">{result.league.name}</h4>
              </div>
              <div className='flex flex-row justify-center items-center my-4'>
                <div className='flex flex-row items-center'>
                  <span className="text-lg text-xl">{shortenTeamName(result.teams.home.name)}</span>
                  <span><img src={result.teams.home.logo} alt="home logo" className="w-7 h-7 h-full m-auto ml-3 mr-3" /></span>
                </div>
                <div className="flex flex-row items-center">
                  <div className="bg-blue-500 text-white font-bold text-lg p-1 border-r-2 border-blue-300 w-8 text-center">
                    {result.goals.home}
                  </div>
                  <div className="bg-blue-500 text-white font-bold text-lg p-1 w-8 text-center">
                    {result.goals.away}
                  </div>
                </div>
                <div className='flex flex-row items-center'>
                  <span><img src={result.teams.away.logo} alt="away logo" className="w-7 h-7 h-full m-auto ml-3 mr-3" /></span>
                  <span className="text-lg text-xl">{shortenTeamName(result.teams.away.name)}</span>
                </div>
              </div>
              <button onClick={() => toggleMatchDetails(index, result.fixture.id)} className='py-2 text-white font-bold'>Match Details</button>
              {renderMatchDetails(result, index)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamResults;

