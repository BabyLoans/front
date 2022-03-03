import React from "react";
import { Row, Col, Layout, Typography, Card } from "antd";
import BalanceChart from "../components/Charts/BalanceChart";

const { Title } = Typography;

const styles = {
  balanceCard: {
    width: "100%",
    borderRadius: "5px",
  },
  card: {
    width: "100%",
    padding: "8px 0",
    borderRadius: "5px",
  },
};

function Dashboard() {
  return (
    <Layout>
      <Row gutter={[16, 20]}>
        <Col className="gutter-row" span={12}>
          <Title level={5}>Balance</Title>
          <Card
            style={styles.balanceCard}
            bodyStyle={{ padding: "0px 24px 0px 24px" }}
          >
            <BalanceChart />
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Title level={5}>Investment Stats</Title>
          <Card style={styles.card}></Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Title level={5}>Best supply rates</Title>
          <Row gutter={[0, 10]}>
            <Col className="gutter-row" span={24}>
              <Card style={styles.card}></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card style={styles.card}></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card style={styles.card}></Card>
            </Col>
            <Col className="gutter-row" span={24}>
              <Card style={styles.card}></Card>
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={18}>
          <Title level={5}>Daily profits</Title>
          <Card style={styles.card}></Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Dashboard;
