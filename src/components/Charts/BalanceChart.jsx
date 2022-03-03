import React from "react";
import { ResponsivePie } from "@nivo/pie";

const margin = { right: 150, left: 0 };

const styles = {
  root: {
    textAlign: "center",
    position: "relative",
    height: 150,
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
    fontSize: "1.5em",
    fontWeight: "bold",
  },
};

const data = [
  {
    id: "BBL",
    label: "BBL",
    value: 125,
  },
  {
    id: "USDT",
    label: "USDT",
    value: 125,
  },
  {
    id: "BUSD",
    label: "BUSD",
    value: 125,
  },
  {
    id: "USDC",
    label: "USDC",
    value: 125,
  },
];

const theme = {
  axis: {
    fontSize: "14px",
    tickColor: "#eee",
    ticks: {
      line: {
        stroke: "#555555",
      },
      text: {
        fill: "#555555",
      },
    },
    legend: {
      itemTextColor: "#555555",
    },
  },
  grid: {
    line: {
      stroke: "#555555",
    },
  },
};

const legends = [
  {
    anchor: "right",
    direction: "column",
    justify: false,
    translateX: 140,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: "left-to-right",
    itemOpacity: 0.85,
    itemTextColor: "#000000",
    symbolSize: 20,
    effects: [
      {
        on: "hover",
        style: {
          itemOpacity: 1,
        },
      },
    ],
  },
];

function BalanceChart(props) {
  let total = 0;

  data.forEach((item) => {
    total += item.value;
  });

  return (
    <div style={styles.root}>
      <ResponsivePie
        margin={margin}
        data={data}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        innerRadius={0.65}
        theme={theme}
        legends={legends}
      />
      <div style={styles.overlay}>
        <span style={styles.total}>$ {total}</span>
      </div>
    </div>
  );
}

export default BalanceChart;
