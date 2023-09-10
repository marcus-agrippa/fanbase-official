import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 
import '../teams/teams.css';

const TeamGoalDistributionChart = ({ goalDistribution }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!goalDistribution) {
      return; 
    }

    if (chartData) {
      chartData.destroy();
    }

    const data = {
      labels: [
        '0-15',
        '16-30',
        '31-45',
        '46-60',
        '61-75',
        '76-90',
      ],
      datasets: [
        {
          label: 'Goal For',
          borderColor: '#22C55E',
          backgroundColor: '#22C55E',
          fill: false,
          tension: 0.1,
          borderWidth: 2,
          data: [
            goalDistribution.goals.for.minute['0-15'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['0-15'].percentage) : 0,
            goalDistribution.goals.for.minute['16-30'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['16-30'].percentage) : 0,
            goalDistribution.goals.for.minute['31-45'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['31-45'].percentage) : 0,
            goalDistribution.goals.for.minute['46-60'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['46-60'].percentage) : 0,
            goalDistribution.goals.for.minute['61-75'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['61-75'].percentage) : 0,
            goalDistribution.goals.for.minute['76-90'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['76-90'].percentage) : 0,
            goalDistribution.goals.for.minute['91-105'].total > 0 ? parseFloat(goalDistribution.goals.for.minute['91-105'].percentage) : 0,
          ],
        },
        {
          label: 'Goal Against',
          borderColor: '#f87272',
          backgroundColor: '#f87272',
          fill: false,
          tension: 0.1,
          borderWidth: 2,
          data: [
            goalDistribution.goals.against.minute['0-15'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['0-15'].percentage) : 0,
            goalDistribution.goals.against.minute['16-30'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['16-30'].percentage) : 0,
            goalDistribution.goals.against.minute['31-45'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['31-45'].percentage) : 0,
            goalDistribution.goals.against.minute['46-60'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['46-60'].percentage) : 0,
            goalDistribution.goals.against.minute['61-75'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['61-75'].percentage) : 0,
            goalDistribution.goals.against.minute['76-90'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['76-90'].percentage) : 0,
            goalDistribution.goals.against.minute['91-105'].total > 0 ? parseFloat(goalDistribution.goals.against.minute['91-105'].percentage) : 0,
          ],
        },
      ],
    };
    

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: true,
          beginAtZero: true,
          max: 100, 
          fontColor: 'white',
          title: {
            display: true,
            text: 'Goal %',
            color: 'white',
            font: {
              size: 17,
            }
          },
          ticks: {
            color: 'white',
            font: {
              size: 17,
            }
          },
        },
        x: {
          display: true,
          beginAtZero: true,
          max: 100, 
          color: 'white',
          title: {
            display: true,
            text: 'Minute Periods',
            color: 'white',
            font: {
              size: 17,
            }
          },
          ticks: {
            color: 'white',
            font: {
              size: 17,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true, 
          position: 'bottom', 
          labels: {
            color: "#ffffff",
            font: {
              size: 16,
            },
          }
        },
      },
    };

    const newChart = new Chart(chartRef.current, {
      type: 'line',
      data,
      options,
    });

    setChartData(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [goalDistribution]);

  return (
    <div>
      <h2 className='text-center text-white'>Goal Distribution</h2>
      <div className="chart-container">
        <canvas ref={chartRef} id="goalDistributionChart" />
      </div>
    </div>
  );
};

export default TeamGoalDistributionChart;





