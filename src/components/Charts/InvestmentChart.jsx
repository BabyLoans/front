import React from "react";
import propTypes from "prop-types";
import { Bar } from "react-chartjs-2";

const options = {
  responsive: true,
  barPercentage: 0.2,
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
  data: propTypes.object.isRequired,
};

export default InvestmentChart;
