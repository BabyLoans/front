import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import propTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Daily return on investment",
      data: labels.map(() => Math.random()),
      borderColor: 'rgba(83, 0, 255, 1)',
      backgroundColor: 'rgba(244, 242, 255, 1)',
    },
  ],
};

function DailyProfitChart() {
  return <Line options={options} data={data} height={"100%"} options={{ maintainAspectRatio: false }}/>;
}



export default DailyProfitChart;