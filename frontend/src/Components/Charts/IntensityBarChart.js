import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function IntensityBarChart({ labels, chartdata }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average Intensity",
        data: chartdata[0],
        backgroundColor: "rgba(227, 232, 95)",
        borderColor: "rgba(75, 192, 192, 1)",
     
      },
    ],
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
          position: "top",
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

  return <Bar data={data} options={options} />;
}

export default IntensityBarChart;