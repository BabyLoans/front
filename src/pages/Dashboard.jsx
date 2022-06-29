import React from "react";
import { useMoralis } from "react-moralis";
import Balance from "components/Dashboard/Balance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faHandHoldingUsd, faCalendarCheck, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Container, Card, CardBody, CardSubtitle, CardTitle, Row, Col, Spinner } from "reactstrap";
import DailyProfit from "components/Charts/DailyProfitChart"; 
import BestSupplyRate from "components/Dashboard/BestSupplyRate";
import InvestmentStats from "components/Dashboard/InvestmentStats";
import { BestSupplyRates, UserInvestmentStats } from "services";


function Dashboard() {
  const { isAuthenticated } = useMoralis();
  const [investmentStats, setInvestmentStats] = React.useState([]);
  const [bestSupplyRates, setBestSupplyRates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      let promises = [
        BestSupplyRates.get(),
        UserInvestmentStats.get(),
      ];

      Promise.all(promises).then((values) => {
        setBestSupplyRates(values[0]);
        setInvestmentStats(values[1]);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <center>
            <Spinner animation="border" variant="primary" />
          </center>
        </>
      ) : (
        <>
        <Container>
          <br />
          <Row>
            <Col md={6}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5> <FontAwesomeIcon icon={faBalanceScale} /> Balance</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Overview of your wallet</CardSubtitle><br />
                  <Balance isAuthenticated={isAuthenticated}/>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5> <FontAwesomeIcon icon={faWallet} /> Investment Stats</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Statistics of your return on investment</CardSubtitle><br />
                  <InvestmentStats datas={investmentStats} />
                </CardBody>
              </Card>
            </Col>
            <Row><br /></Row>
            <Col md={5}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5><FontAwesomeIcon icon={faHandHoldingUsd} /> Best supply rates</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Overview of the best returns on assets</CardSubtitle><br />
                  <Row>
                    {bestSupplyRates.map((token) => {
                      return (
                        <BestSupplyRate datas={token} />
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={7}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5><FontAwesomeIcon icon={faCalendarCheck} /> Daily Profits</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Graphical representation of your daily returns</CardSubtitle><br />
                  <Row>
                    <DailyProfit/>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          </Container>
        </>
      )}
    </>
  );
}

export default Dashboard;
