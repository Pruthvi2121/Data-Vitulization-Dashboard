import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = ({labels, datasets}) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

//   const options = {
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };

  const options = {
    indexAxis: "x",
    
    plugins: {
        legend: {
        //   display: true,
          position: "bottom"
        },
      },
   
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          position: "top",
        },
        stacked: true,
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "green",
        },
      },
      stacked: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;