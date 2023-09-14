import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const InjuriesAndSuspensions = ({ teamId, season }) => {
  const [injuries, setInjuries] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to control showing all injuries

  useEffect(() => {
    const fetchInjuries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/injuries?team=${teamId}&season=${season}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
          }
        });

        const data = await response.json();
        const sortedAndFilteredInjuries = filterAndSortInjuries(data.response);
        setInjuries(sortedAndFilteredInjuries);
      } catch (error) {
        console.error('Error fetching injuries:', error);
      }
    };

    const filterAndSortInjuries = (injuries) => {
      const today = new Date();
      return injuries
        .filter(injury => new Date(injury.fixture.date) <= today)
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
        .slice(0, showAll ? injuries.length : 5); // Show all or 5 injuries based on showAll state
    };

    fetchInjuries();
  }, [teamId, season, showAll]); // Include showAll in the dependency array

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg relative">
      <h1 className="text-3xl font-bold text-center my-4">Injuries and Suspensions</h1>
      <p className='text-center'>Impacting next fixture</p>
      <div className="mt-10">
        {injuries.map((injury, index) => (
          <div key={index} className={`border border-gray-500 rounded p-4 mb-4 ${index % 2 === 1 ? 'bg-gray-800' : ''}`}>
            <div className="text-center">
              <p className="font-bold text-white mb-1">{injury.player.name}</p>
              <p className="text-xs text-gray-400">{formatDate(injury.fixture.date)}</p> {/* Display transfer date */}
              <div className="flex items-center justify-center">
                <img
                  src={injury.league.logo}
                  alt={injury.league.name}
                  className="w-8 h-8 mx-auto mt-2 rounded-full bg-white p-1"
                /> {/* Display league logo */}
              </div>
              <p className="text-sm px-2 py-1 inline-block bg-accent my-3">{injury.league.name}</p>
              <p className="text-white mb-1">{injury.player.reason}</p>
              <p className="text-white mb-1">{injury.player.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        {!showAll ? (
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        ) : (
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded"
            onClick={() => setShowAll(false)}
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default InjuriesAndSuspensions;
