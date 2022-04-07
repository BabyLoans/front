import React from "react";
import Balance from "components/Dashboard/Balance";
import { Row, Col, Layout, Typography, Card, Spin } from "antd";
import BestSupplyRate from "components/Dashboard/BestSupplyRate";
import InvestmentStats from "components/Dashboard/InvestmentStats";
import { UserBalance, BestSupplyRates, UserInvestmentStats } from "services";

const { Title } = Typography;

function Dashboard() {
  const [balance, setBalance] = React.useState([]);
  const [investmentStats, setInvestmentStats] = React.useState([]);
  const [bestSupplyRates, setBestSupplyRates] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      let promises = [
        UserBalance.get(),
        BestSupplyRates.get(),
        UserInvestmentStats.get(),
      ];

      Promise.all(promises).then((values) => {
        setBalance(values[0]);
        setBestSupplyRates(values[1]);
        setInvestmentStats(values[2]);

        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Layout>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <br />
          <Row gutter={[20, 20]}>
            <Col className="gutter-row" span={10}>
              <Title className="dashboard-title-card">Balance</Title>
              <Card
                className="dashboard-card"
              >
                <Balance datas={balance} />
              </Card>
            </Col>
            <Col className="gutter-row" span={10}>
              <Title className="dashboard-title-card">Investment Stats</Title>
              <Card className="dashboard-card">
                <InvestmentStats datas={investmentStats} />
              </Card>
            </Col>
            <Col className="gutter-row" span={5}>
              <Title className="dashboard-title-card">Best supply rates</Title>
              <Row gutter={[0, 10]}>
                {bestSupplyRates.map((token) => {
                  return (
                    <Col
                      className="gutter-row"
                      span={24}
                      key={"best_rate_" + token.id}
                    >
                      <Card className="dashboard-card">
                        <BestSupplyRate datas={token} />
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col className="gutter-row" span={15}>
              <Title className="dashboard-title-card">Daily profits</Title>
              <Card className="dashboard-card"></Card>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
