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
        console.log('injuries', sortedAndFilteredInjuries)
      } catch (error) {
        console.error('Error fetching injuries:', error);
      }
    };

    const filterAndSortInjuries = (injuries) => {
      const today = new Date();
      return injuries
        .filter(injury => new Date(injury.fixture.date) <= today)
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
        .slice(0, 10);
    };

    fetchInjuries();
  }, [teamId, season]);

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Injuries and Suspensions</h1>
      <p className='text-center'>Impacting next fixture</p>
      <div className="overflow-x-auto mt-10">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Reason</th>
            <th className="py-2">Type</th>
            <th className="hidden sm:table-cell py-2">Competition</th>
            <th className="hidden sm:table-cell py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {injuries.map((injury, index) => (
            <tr key={index} className={index % 2 === 1 ? 'odd:bg-gray-800' : ''}>
              <td className="border border-gray-500 py-2 text-center">{injury.player.name}</td>
              <td className="border border-gray-500 py-2 text-center">{injury.player.reason}</td>
              <td className="border border-gray-500 py-2 text-center">{injury.player.type}</td>
              <td className="hidden sm:table-cell border border-gray-500 py-2 text-center">{injury.league.name}</td>
              <td className="hidden sm:table-cell border border-gray-500 py-2 text-center">{formatDate(injury.fixture.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default InjuriesAndSuspensions;