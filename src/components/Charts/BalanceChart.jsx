import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const margin = { left: 0, right: 100 };

const styles = {
  root: {
    textAlign: "center",
    position: "relative",
    height: "25vh",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: margin.right,
    left: margin.left,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // This is important to preserve the chart interactivity
    pointerEvents: "none",
  },
  total: {
    fontSize: "3.5vh",
    fontWeight: "bold",
  },
};

const data = {
  labels: ["BBL", "USDT", "BUSD", "USDC", "DAI"],
  datasets: [
    {
      label: "My First Dataset",
      data: [125, 125, 125, 125, 125],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(49, 12, 86)",
        "rgb(12, 12, 12)",
      ],
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  hover: { mode: null },
  tooltips: { enabled: false },
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const plugins = [
  {
    afterUpdate: function (chart) {
      let datasets = chart.getDatasetMeta(0);

      datasets.data.forEach((arc) => {
        arc.round = {
          x: (chart.chartArea.left + chart.chartArea.right) / 2,
          y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
          radius: (arc.outerRadius + arc.innerRadius) / 2,
          thickness: (arc.outerRadius - arc.innerRadius) / 2,
          backgroundColor: arc.options.backgroundColor,
        };
      });
    },
    afterDraw: (chart) => {
      let datasets = chart.getDatasetMeta(0);
      let { ctx } = chart;

      datasets.data.forEach((arc) => {
        var startAngle = Math.PI / 2 - arc.startAngle;
        ctx.save();
        ctx.translate(arc.round.x, arc.round.y);
        ctx.fillStyle = arc.options.backgroundColor;
        ctx.beginPath();

        ctx.arc(
          arc.round.radius * Math.sin(startAngle),
          arc.round.radius * Math.cos(startAngle),
          arc.round.thickness / 1.05,
          0,
          2 * Math.PI
        );

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    },
  },
];

function BalanceChart(props) {
  let total = 0;

  data.datasets[0].data.forEach((value) => {
    total += value;
  });

  return (
    <div style={styles.root}>
      <Doughnut
        data={data}
        options={options}
        plugins={plugins}
        style={{ marginLeft: margin.left }}
      />
      <div style={styles.overlay}>
        <span style={styles.total}>$ {total}</span>
      </div>
    </div>
  );
}

export default BalanceChart;
