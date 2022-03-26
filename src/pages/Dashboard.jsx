import React from "react";
import { Row, Col, Layout, Typography, Card } from "antd";
import Balance from "components/Dashboard/Balance";
import InvestmentStats from "components/Dashboard/InvestmentStats";
import { WalletOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title } = Typography;

const dashboardData = {
  labels: ["BBL", "USDT", "BUSD", "USDC", "DAI"],
  datasets: [
    {
      data: [125, 125, 125, 125, 125],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(49, 12, 86)",
        "rgb(12, 12, 12)",
      ],
    },
  ],
};

const investmentStatsData = {
  labels: [
    "Total investments",
    "Weekly returns",
    "Monthly returns",
    "Total returns",
  ],
  icons: [WalletOutlined, CalendarOutlined, CalendarOutlined, CalendarOutlined],
  datasets: [
    {
      data: [500, 3.58, 14.32, 56.14],
      backgroundColor: [
        "rgba(238, 184, 11, 1)",
        "rgba(83, 0, 255, 1)",
        "rgba(83, 0, 255, 1)",
        "rgba(83, 0, 255, 1)",
      ],
    },
  ],
};

function Dashboard() {
  return (
    <Layout>
      <Row gutter={[16, 20]}>
        <Col className="gutter-row" span={12}>
          <Title level={5}>Balance</Title>
          <Card
            className="dashboard-balance-card"
            bodyStyle={{ padding: "0px 24px 0px 24px" }}
          >
            <Balance data={dashboardData} />
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Title level={5}>Investment Stats</Title>
          <Card className="dashboard-card">
            <InvestmentStats data={investmentStatsData} />
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Title level={5}>Best supply rates</Title>
          <Row gutter={[0, 10]}>
            <Col className="gutter-row" span={24}>
              <Card className="dashboard-card"></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card className="dashboard-card"></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card className="dashboard-card"></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card className="dashboard-card"></Card>
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={18}>
          <Title level={5}>Daily profits</Title>
          <Card className="dashboard-card"></Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Dashboard;
