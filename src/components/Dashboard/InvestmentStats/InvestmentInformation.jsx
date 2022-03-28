import React from "react";
import { Row, Col } from "antd";
import LogoCard from "./LogoCard";
import propTypes from "prop-types";

function InvestmentInformation(props) {
  const { LogoIcon, cardColor, cardLength, cardTitle, cardAmount } = props;

  return (
    <Row>
      <Col className="test-div card-spacing">
        <LogoCard
          LogoIcon={LogoIcon}
          cardColor={cardColor}
          cardLength={cardLength}
        />
      </Col>
      <Col className="investment-stat-card-text">
        <h5 className="investment-stat-card-title">{cardTitle}</h5>
        <span style={{ color: cardColor }}>$ {cardAmount}</span>
      </Col>
    </Row>
  );
}

InvestmentInformation.propTypes = {
  LogoIcon: propTypes.object.isRequired,
  cardColor: propTypes.string.isRequired,
  cardTitle: propTypes.string.isRequired,
  cardAmount: propTypes.number.isRequired,
  cardLength: propTypes.number.isRequired,
};

export default InvestmentInformation;
