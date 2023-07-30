import React, { useState, useEffect } from 'react';

const TransferNews = ({ teamId }) => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/transfers?team=${teamId}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_TOKEN,
          },
        });

        const data = await response.json();
        setTransfers(data.response);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, [teamId]);

  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 3));

  const recentTransfers = transfers.filter((transfer) => {
    const transferDate = new Date(transfer.transfers[0].date);
    return transferDate >= sixMonthsAgo;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">Recent Transfers</h1>
      <p className='text-center'>Last 3 months</p>
      <div className="overflow-x-auto mt-10">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="py-2">Player</th>
            <th className="hidden sm:table-cell py-2">Date</th>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Fee</th>
          </tr>
        </thead>
        <tbody>
          {recentTransfers.map((transfer, index) => (
            <tr key={index}>
              <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>
                {transfer.player.name}
              </td>
              <td className={`hidden sm:table-cell border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>
                {formatDate(transfer.transfers[0].date)}
              </td>
              <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>
                {transfer.transfers[0].teams.out.name}
              </td>
              <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>
                {transfer.transfers[0].teams.in.name}
              </td>
              <td className={`border border-gray-500 py-2 text-center${index % 2 === 1 ? ' bg-gray-800' : ''}`}>
                {transfer.transfers[0].type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TransferNews;



