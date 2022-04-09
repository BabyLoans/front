import React from "react";
import propTypes from "prop-types";
import { Row, Col, Badge } from "reactstrap";
import BestSupplyRateChart from "components/Charts/BestSupplyRateChart";

function buildDatasetsFromDatas(datas) {
  const datasets = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  for (let rate of datas.rates) {
    datasets.labels.push(new Date(rate.createdAt).toLocaleString());
    datasets.datasets[0].data.push(rate.value);
  }

  return datasets;
}

function BestSupplyRate(props) {
  const { datas } = props;

  const datasets = buildDatasetsFromDatas(datas);

  return (
    <>
      <br /><br /><br />
      <Row>
        <Col md={1}></Col>
        <Col md={2}>
          <img
            alt="logo coin"
            className="img-center img-fluid"
            src={datas.logoUrl}
            style={{ width: "25px" }}
          />
          {datas.symbol}
        </Col>
        <Col md={8}>
          <Badge color="dark" style={{ display: "block" }}>
            <BestSupplyRateChart data={datasets} />
            <span className="best-supply-rate-percent">
              {datas.rates[0].value} %
            </span>
          </Badge>
        </Col>
      </Row>
    </>
  );
}

BestSupplyRate.propTypes = {
  datas: propTypes.object.isRequired,
};

export default BestSupplyRate;
