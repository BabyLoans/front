import React from "react";
import propTypes from "prop-types";
import { Bar } from "react-chartjs-2";

const options = {
  responsive: true,
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
      position: "right",
    },
  },
};

function InvestmentChart(props) {
  const { data } = props;

  return <Bar data={data} options={options} />;
}

InvestmentChart.propTypes = {
  data: propTypes.array.isRequired,
};

export default InvestmentChart;
