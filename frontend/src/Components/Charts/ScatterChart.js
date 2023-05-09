import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = ({dataset}) => {
    const data = {
      datasets: dataset,
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Likelihood on x axis',
            color: 'white',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Relevance on y axis',
            color: 'white',
          },
        },
      },
    };
  
    return <Scatter data={data} options={options} />;
  };

  export default ScatterChart