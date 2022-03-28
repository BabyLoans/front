import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  pointRadius: 0,
  responsive: true,
  lineTension: 0.5,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  borderColor: "#4FDFB1",
};

function BestSupplyRateChart(props) {
  const { data } = props;

  return <Line data={data} options={options} />;
}

export default BestSupplyRateChart;
