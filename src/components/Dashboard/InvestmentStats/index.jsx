import React from "react";
import { Row, Col } from "antd";
import propTypes from "prop-types";
import InvestmentChart from "../../Charts/InvestmentChart";
import InvestmentInformation from "./InvestmentInformation";
import { WalletOutlined, CalendarOutlined } from "@ant-design/icons";

function buildDatasetsFromDatas(datas) {
  const datasets = {
    labels: [],
    icons: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  for (let data of datas) {
    datasets.labels.push(data.name);

    if (data.name === "Total Investment") {
      datasets.icons.push(WalletOutlined);
      datasets.datasets[0].backgroundColor.push("rgba(238, 184, 11, 1)");
    } else {
      datasets.icons.push(CalendarOutlined);
      datasets.datasets[0].backgroundColor.push("rgba(83, 0, 255, 1)");
    }

    datasets.datasets[0].data.push(data.value);
  }

  return datasets;
}

function InvestmentStats(props) {
  const { datas } = props;

  const datasets = buildDatasetsFromDatas(datas);

  return (
    <Row className="test-div">
      <Col className="test-div">
        {datasets.labels.map((label, index) => {
          return (
            <InvestmentInformation
              key={"investment_information_" + index}
              cardLength={40}
              cardTitle={label}
              LogoIcon={datasets.icons[index]}
              cardAmount={datasets.datasets[0].data[index]}
              cardColor={datasets.datasets[0].backgroundColor[index]}
            />
          );
        })}
      </Col>
      <Col className="investment-stat-col">
        <InvestmentChart data={datasets} />
      </Col>
    </Row>
  );
}

InvestmentStats.propTypes = {
  datas: propTypes.array.isRequired,
};

export default InvestmentStats;
