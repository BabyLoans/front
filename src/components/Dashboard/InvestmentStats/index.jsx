import React from "react";
import { Container, Row, Col } from "reactstrap";
import propTypes from "prop-types";
import InvestmentChart from "../../Charts/InvestmentChart";
import InvestmentInformation from "./InvestmentInformation";

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
  const { datas } = props;

  const datasets = buildDatasetsFromDatas(datas);

  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  );
}

InvestmentStats.propTypes = {
  datas: propTypes.array.isRequired,
};

export default InvestmentStats;
