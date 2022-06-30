import React from "react";
import propTypes from "prop-types";
import { Alert } from "reactstrap";
import BalanceChart from "components/Charts/BalanceChart";
import { useERC20Balances } from "react-moralis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

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

  if (datas !== null) {
    for (let data of datas) {
      datasets.labels.push(data.name);
      datasets.datasets[0].data.push(parseFloat(data.balance).toFixed(data.decimal));
      datasets.datasets[0].backgroundColor.push("#"+Math.random().toString(16).substr(-6));
    }
  }
  
  return datasets;
}

function Balance(props) {
  const { isAuthenticated } = props;
  const [isVisibleChart, setIsVisibleChart] = React.useState(false);
  const { data, isLoading } = useERC20Balances();
  const [datasets, setDatasets] = React.useState();

  React.useEffect(() => {
    if (!isLoading) {
      let datasetsTmp = buildDatasetsFromDatas(data);
      setDatasets(datasetsTmp);
      setIsVisibleChart(true);
    }
  }, [isLoading]) 

  return (
    <>
      {!isVisibleChart || !isAuthenticated? (
        <>
          <Alert color="danger">
            <FontAwesomeIcon icon={faWallet} /> Wallet not connected
          </Alert>
        </>
      ) : (
        <div style={styles.root}>
          {isVisibleChart && (
            <BalanceChart
              data={datasets}
              legendFontSize={14}
              style={{ marginLeft: margin.left, marginRight: margin.right }}
              {...props}
            />
          )}
        </div>
      )}
    </>
  );
}

Balance.propTypes = {
  datas: propTypes.array.isRequired,
};

export default Balance;
