import React, { useState, useEffect } from 'react';

const TransferNews = ({ teamId }) => {
  const [transfers, setTransfers] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to control showing all transfers

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
    <div className="bg-dark-1 text-white p-4 rounded-lg relative">
      <h1 className="text-3xl font-bold text-center my-4">Recent Transfers</h1>
      <p className='text-center'>Last 3 months</p>
      <div className="mt-10">
        {recentTransfers.slice(0, showAll ? recentTransfers.length : 5).map((transfer, index) => (
          <div key={index} className={`border border-gray-500 rounded p-4 mb-4 ${index % 2 === 1 ? 'bg-gray-800' : ''}`}>
            <div className="text-center">
              <p className="font-bold text-white mb-1">{transfer.player.name}</p>
              <p className="text-xs text-gray-400">{formatDate(transfer.transfers[0].date)}</p> {/* Display transfer date */}
              <div className="flex items-center justify-center mb-2">
                <img
                  src={transfer.transfers[0].teams.out.logo}
                  alt={transfer.transfers[0].teams.out.name}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-white mr-2">{transfer.transfers[0].teams.out.name}</span>
                <span className="px-2 text-green-500">&#8594;</span>
                <img
                  src={transfer.transfers[0].teams.in.logo}
                  alt={transfer.transfers[0].teams.in.name}
                  className="w-8 h-8"
                />
                <span className="text-white">{transfer.transfers[0].teams.in.name}</span>
              </div>
              <p className="font-bold text-xl">{transfer.transfers[0].type}</p>
            </div>
          </div>
        ))}
      </div>
      {showAll ? (
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded mt-10 block mx-auto"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      ) : (
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded mt-10 block mx-auto"
          onClick={() => setShowAll(true)}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default TransferNews;


