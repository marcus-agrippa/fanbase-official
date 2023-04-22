import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://v3.football.api-sports.io';

const ManagerDetails = ({ teamId }) => {
  const [manager, setManager] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [trophies, setTrophies] = useState([]);

  const fetchManager = async (teamId) => {
    try {
      const response = await fetch(`${BASE_URL}/coachs?team=${teamId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
        }
      })

      const data = await response.json();
      const managerData = data.response[0];
      setManager(managerData);
      setManagerId(managerData.id);
    } catch (error) {
      console.error('Error fetching manager:', error);
    }
  };

  const fetchTrophies = async () => {
    if (!managerId) return;

    try {
      const response = await fetch(`${BASE_URL}/trophies?coach=${managerId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
        }
      })

      const data = await response.json();
      const trophiesData = data.response;
      setTrophies(trophiesData);
    } catch (error) {
      console.error('Error fetching trophies:', error);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchManager(teamId);
    }
  }, [teamId]);

  useEffect(() => {
    if (managerId) {
      fetchTrophies();
    }
  }, [managerId]);

  const winningTrophies = trophies.filter(trophy => trophy.place === 'Winner');

 return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Manager Information</h1>
      {manager && (
        <div className="flex flex-col items-center text-center mt-10">
          <img
            src={manager.photo || "/default-photo.png"}
            alt={`Photo of ${manager.name}`}
          />
          <h2>Manager: {manager.name || "N/A"}</h2>
          <p className="my-4">
            <span className="text-accent mr-2">Age:</span> {manager.age || "N/A"}
          </p>
          <p className="my-4">
            <span className="text-accent mr-2">Nationality:</span>{" "}
            {manager.nationality || "N/A"}
          </p>
          <p className="my-4">
            <span className="text-accent mr-2">Start Date:</span>{" "}
            {manager.career && manager.career[0].start || "N/A"}
          </p>
          <p className="my-4">
            <span className="text-accent mr-2">Previous Club:</span>{" "}
            {manager.career && manager.career[1].team.name || "N/A"}
          </p>
        </div>
      )}
      <div>
        <h2 className='text-center text-lg text-accent'>Trophies:</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="py-2">League</th>
              <th className="py-2">Country</th>
              <th className="py-2">Season</th>
            </tr>
          </thead>
          <tbody>
            {winningTrophies.map((trophy, index) => (
              <tr key={index}>
                <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>{trophy.league}</td>
                <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>{trophy.country}</td>
                <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>{trophy.season}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDetails;
