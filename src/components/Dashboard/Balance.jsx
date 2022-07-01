import React from "react";
import propTypes from "prop-types";
import { Alert } from "reactstrap";
import { useMoralis } from "react-moralis";
import { Comptroller, BToken } from "services";
import BalanceChart from "components/Charts/BalanceChart";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  console.log(datas);

  if (datas !== null) {
    for (let data of datas) {
      datasets.labels.push(data.underlyingToken.symbol);
      datasets.datasets[0].data.push(data.underlyingToken.balanceOf);
      datasets.datasets[0].backgroundColor.push(
        "#" + Math.random().toString(16).substr(-6)
      );
    }
  }

  console.log(datasets);

  return datasets;
}

function Balance(props) {
  const { isAuthenticated } = props;
  const { web3, isWeb3Enabled, isWeb3EnableLoading, account } = useMoralis();
  const [datasets, setDatasets] = React.useState();
  const [isVisibleChart, setIsVisibleChart] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    if (isWeb3Enabled && !isWeb3EnableLoading) {
      let bTokens = await Comptroller.fetchBTokenContracts(web3);

      let datas = [];

      for (let bToken of bTokens) {
        datas.push(await BToken.fetchBTokenInfos(web3, bToken, account));
      }

      setDatasets(buildDatasetsFromDatas(datas));
      setIsVisibleChart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, isWeb3EnableLoading]);

  return (
    <>
      {!isAuthenticated ? (
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
