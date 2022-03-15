import React from "react";
import propTypes from "prop-types";
import { Row, Col } from "antd";
import { WalletOutlined, CalendarOutlined } from "@ant-design/icons";

function LogoCard(props) {
  const { LogoIcon, cardColor, cardLength } = props;
  return (
    <div
      style={{
        display: "flex",
        width: cardLength,
        height: cardLength,
        borderRadius: 2.45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cardColor,
      }}
    >
      <LogoIcon style={{ fontSize: cardLength / 1.5 }} />
    </div>
  );
}

LogoCard.propTypes = {
  LogoIcon: propTypes.element.isRequired,
  cardColor: propTypes.string.isRequired,
  cardLength: propTypes.number.isRequired,
};

function InvestmentInformation(props) {
  const { LogoIcon, cardColor, cardLength } = props;

  return (
    <Row>
      <Col className="test-div card-spacing">
        <LogoCard
          LogoIcon={LogoIcon}
          cardColor={cardColor}
          cardLength={cardLength}
        />
      </Col>
      <Col className="test-div"></Col>
    </Row>
  );
}

InvestmentInformation.propTypes = {
  LogoIcon: propTypes.element.isRequired,
  cardColor: propTypes.string.isRequired,
  cardLength: propTypes.number.isRequired,
};

function InvestmentStats() {
  return (
    <Row className="test-div">
      <Col className="test-div">
        <InvestmentInformation
          LogoIcon={WalletOutlined}
          cardColor="#EEB80B"
          cardLength={40}
        />
        <InvestmentInformation
          LogoIcon={CalendarOutlined}
          cardColor="#5300FF"
          cardLength={40}
        />
        <InvestmentInformation
          LogoIcon={CalendarOutlined}
          cardColor="#5300FF"
          cardLength={40}
        />
        <InvestmentInformation
          LogoIcon={CalendarOutlined}
          cardColor="#5300FF"
          cardLength={40}
        />
      </Col>
      <Col className="test-div"></Col>
    </Row>
  );
}

InvestmentStats.propTypes = {
  data: propTypes.array.isRequired,
};

export default InvestmentStats;
