import React, { useState, useEffect } from 'react';
import HeadToHeadStats from './HeadToHeadStats';

const BASE_URL = 'https://v3.football.api-sports.io';

const NextFixture = ({ teamId }) => {
  const [nextFixture, setNextFixture] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchLiveMatches = async (teamId) => {
      try {
        const response = await fetch(`${BASE_URL}/fixtures?team=${teamId}&live=all`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });
        const data = await response.json();
        setLiveMatches(data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live matches:', error);
        setLoading(false);
      }
    };

    if (teamId) {
      fetchNextFixture(teamId);
      fetchLiveMatches(teamId);
    }
  }, [teamId]);

  // Define the function to check if a match is live based on status
  const checkIfLiveMatch = (fixture) => {
    const short = fixture.fixture.status.short;

    const liveStatusValues = ['1H', '2H', 'ET', 'BT', 'P', 'INT', 'LIVE'];

    return liveStatusValues.includes(short);
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

  const hasLiveMatch = liveMatches.some(checkIfLiveMatch);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
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
      {hasLiveMatch ? (
        <div>
          <h1 className="text-3xl font-bold text-center my-4">In-Game</h1>
          {liveMatches.map((match, index) => (
            <div key={match.fixture.id} className="flex items-center justify-center space-y-2 flex-row space-y-0 bg-gray-800 rounded-lg">
              <div className='flex flex-col items-center py-4'>
              <span className='text-green-500 text-center'>Live</span>
              <div className="flex justify-between items-center my-4">
                <div className="flex items-center">
                  <span>{shortenTeamName(match.teams.home.name)}</span>
                  <img src={match.teams.home.logo} alt="home logo" className="w-10 h-10 mr-3 ml-3" />
                </div>
                <div className='flex flex-col items-center'>
                  <div className="flex flex-row items-center">
                    <div className="bg-blue-500 text-white font-bold text-lg p-1 border-r-2 border-blue-300 w-8 text-center">
                      {match.goals.home}
                    </div>
                    <div className="bg-blue-500 text-white font-bold text-lg p-1 w-8 text-center">
                      {match.goals.away}
                    </div>
                  </div>
                  <span className='text-slate-300 pt-2'>{match.fixture.status.elapsed}'</span>
                </div>
                <div className="flex items-center">
                  <img src={match.teams.away.logo} alt="away logo" className="w-10 h-10 ml-3 mr-3" />
                  <span>{shortenTeamName(match.teams.away.name)}</span>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
        <h1 className="text-3xl font-bold text-center my-4">Next Fixture</h1>
        <div className='text-center'>
            <p className='text-sm px-2 py-1 inline-block bg-accent my-3'>{nextFixture.league.name}</p>
            <p className='my-2'><span className='text-accent mr-2'></span>{nextFixture.league.round}</p>
            {/* <div className="flex justify-center flex-col items-center my-3">
                  <span className='my-2'>vs</span>
                  <img src={nextFixture.teams.away.logo} alt="away logo" className="w-10 h-10 mr-3 ml-3" />
            </div> */}
            <p className='my-1'>
              <span className='text-accent mr-2'>Date/Time:</span>
              {formatDate(nextFixture.fixture.date)}
            </p>
            <p className='my-5'><span className='text-accent mr-2'>Venue:</span>{nextFixture.fixture.venue.name}</p>
            <p className='my-5'>
              <span className='text-accent mr-2'>Referee:</span>
              {nextFixture.fixture.referee ? nextFixture.fixture.referee : 'TBC'}
            </p>
          </div><div className='flex justify-center flex-col'>
              <HeadToHeadStats team1Id={homeTeamId} team2Id={awayTeamId} fixtureID={nextFixture.fixture.id} />
            </div></> 
      )}
    </div>
  );
};

export default NextFixture;
