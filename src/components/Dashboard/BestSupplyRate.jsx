import React from "react";
import propTypes from "prop-types";
import { Row, Col, Image } from "antd";
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
    <Row className="">
      <Col className="best-supply-rate-image">
        <Image src={datas.logoUrl} width={20} />
      </Col>
      <Col className="best-supply-rate-name">
        <h3>{datas.symbol}</h3>
      </Col>
      <Col>
        <Row>
          <BestSupplyRateChart data={datasets} />
        </Row>
        <Row>
          <span className="best-supply-rate-percent">
            {datas.rates[0].value} %
          </span>
        </Row>
      </Col>
    </Row>
  );
}

BestSupplyRate.propTypes = {
  datas: propTypes.object.isRequired,
};

export default BestSupplyRate;
