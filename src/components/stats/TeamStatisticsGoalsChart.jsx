import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the 'Chart' object

const TeamStatisticsGoalsChart = ({ teamStats }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    if (!teamStats) {
      return; // No data, nothing to render
    }

    // Check if the chart instance exists, and destroy it if it does
    if (chartData) {
      chartData.destroy();
    }

    const data = {
      labels: [
        'Goals Against Total',
        'Goals Against Home',
        'Goals Against Away',
        'Goals For Total',
        'Goals For Home',
        'Goals For Away',
      ],
      datasets: [
        {
          label: 'Average Goals',
          backgroundColor: 'indigo-500',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: [
            teamStats.goals.against.average.total,
            teamStats.goals.against.average.home,
            teamStats.goals.against.average.away,
            teamStats.goals.for.average.total,
            teamStats.goals.for.average.home,
            teamStats.goals.for.average.away,
          ],
        },
      ],
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          // You can customize other scale options here
        },
      },
      plugins: {
        legend: {
          display: true, // Set to true to display legend
          position: 'top', // You can change the legend position
        },
      },
    };

    // Create a new chart instance
    const newChart = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options,
    });

    // Set the chart data to update it when needed
    setChartData(newChart);

    return () => {
      // Clean up the chart when the component unmounts
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [teamStats]);

  return (
    <div>
      <h2>Team Statistics</h2>
      <canvas ref={chartRef} id="goalsChart" />
    </div>
  );
};

export default TeamStatisticsGoalsChart;


