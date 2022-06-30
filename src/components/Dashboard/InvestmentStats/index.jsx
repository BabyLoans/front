import React from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import propTypes from "prop-types";
import InvestmentChart from "../../Charts/InvestmentChart";
import InvestmentInformation from "./InvestmentInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

function buildDatasetsFromDatas(datas) {
  const datasets = {
    labels: [
      
    ],
    icons: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["rgba(83, 0, 255, 1)"],
      },
    ],
  };

  for (let data of datas) {
    datasets.labels.push(data.name);
    datasets.datasets[0].data.push(data.value);
  }

  return datasets;
}

function InvestmentStats(props) {
  const { datas, isAuthenticated } = props;

  const datasets = buildDatasetsFromDatas(datas);

  return (
    <Container>
      <Row>
        {!isAuthenticated? (
          <>
            <Alert color="danger">
              <FontAwesomeIcon icon={faWallet} /> Wallet not connected
            </Alert>
          </>
        ) : (
          <>
            <Col>
              {datasets.labels.map((label, index) => {
                return (
                  <InvestmentInformation
                    key={"investment_information_" + index}
                    cardTitle={label}
                    cardAmount={datasets.datasets[0].data[index]}
                  />
                );
              })}
            </Col>
            <Col>
              <InvestmentChart data={datasets} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

InvestmentStats.propTypes = {
  datas: propTypes.array.isRequired,
};

export default InvestmentStats;
