import React from 'react';
import { Bubble } from 'react-chartjs-2';


const BubbleChart = ({data1}) => {
    
  const data = {
    datasets: data1
 };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: "left"
          },
        },
        
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-axis', // Customize the x-axis label
        
        },
        ticks: {
          color: "lightblue",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y-axis', // Customize the y-axis label
        },
        ticks: {
          color: "lightblue",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div>
      <Bubble data={data} options={options} />
    </div>
  );
};

export default BubbleChart;












// [
//     {
//       label: 'Bubble Chart',
//       data: [
//         { x: 10, y: 20, r: 5 },
//         { x: 15, y: 10, r: 10 },
//         { x: 7, y: 25, r: 8 },
//         // Add more data points as needed
//       ],
//       backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize the bubble color
//     },
//   ],
