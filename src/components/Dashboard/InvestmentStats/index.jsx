import React from "react";
import { Row, Col } from "antd";
import propTypes from "prop-types";
import InvestmentChart from "../../Charts/InvestmentChart";
import InvestmentInformation from "./InvestmentInformation";

function InvestmentStats(props) {
  const { data } = props;

  return (
    <Row className="test-div">
      <Col className="test-div">
        {data.labels.map((label, index) => {
          return (
            <InvestmentInformation
              cardLength={40}
              cardTitle={label}
              LogoIcon={data.icons[index]}
              cardAmount={data.datasets[0].data[index]}
              cardColor={data.datasets[0].backgroundColor[index]}
            />
          );
        })}
      </Col>
      <Col className="investment-stat-col">
        <InvestmentChart data={data} />
      </Col>
    </Row>
  );
}

InvestmentStats.propTypes = {
  data: propTypes.object.isRequired,
};

export default InvestmentStats;
