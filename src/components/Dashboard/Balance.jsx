import React from "react";
import propTypes from "prop-types";
import BalanceChart from "components/Charts/BalanceChart";

const margin = { left: 0, right: 100 };

const styles = {
  root: {
    textAlign: "center",
    position: "relative",
    height: "25vh",
  },
};

function Balance(props) {
  let total = 0;

  const { data } = props;

  data.datasets[0].data.forEach((value) => {
    total += value;
  });

  return (
    <div style={styles.root}>
      <BalanceChart
        data={data}
        total={total}
        legendFontSize={14}
        style={{ marginLeft: margin.left, marginRight: margin.right }}
        {...props}
      />
    </div>
  );
}

Balance.propTypes = {
  data: propTypes.object.isRequired,
};

export default Balance;
