import React from "react";


import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


function LineChart({Data, labels}){

    const data = {
        labels:labels,
        datasets: [
          {
            label: "Income",
            data: Data,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1
          },
      
  
          
        ]
      
        
      };

      const options = {
        indexAxis: "x",
       
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "white",
             
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "green",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
      

    
    return <Line data={data} options={options}  />
}

export default LineChart
