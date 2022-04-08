import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  pointRadius: 0,
  lineTension: 0.5,
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

  return <Line data={data} options={options} height={25} />;
}

export default BestSupplyRateChart;
