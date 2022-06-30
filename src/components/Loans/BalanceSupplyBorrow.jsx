import React from "react";
import propTypes from "prop-types";
import BalanceSupplyBorrowChart from "components/Charts/BalanceSupplyBorrowChart";

const margin = { left: 0, right: 100 };

const styles = {
  root: {
    textAlign: "center",
    position: "relative",
    height: "25vh",
  },
};

function buildDatasetsFromDatas(datas) {
  const datasets = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  for (let property in datas) {
    datasets.labels.push(property);
    datasets.datasets[0].data.push(datas[property]);
    datasets.datasets[0].backgroundColor.push("#" + Math.random().toString(16).substr(-6));
  }
  return datasets;
}

function Balance(props) {
  let total = 0;

  const { datas } = props;

  const datasets = buildDatasetsFromDatas(datas);

  datasets.datasets[0].data.forEach((value) => {
    total += value;
  });

  return (
    <div style={styles.root}>
      <BalanceSupplyBorrowChart
        data={datasets}
        total={total}
        legendFontSize={14}
        style={{ marginLeft: margin.left, marginRight: margin.right }}
        {...props}
      />
    </div>
  );
}

Balance.propTypes = {
  datas: propTypes.array.isRequired,
};

export default Balance;
