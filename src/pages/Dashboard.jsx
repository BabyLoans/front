import React from "react";
import Balance from "components/Dashboard/Balance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faHandHoldingUsd, faCalendarCheck, faNewspaper, faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Row,
  Col, 
  Spinner } from "reactstrap";
import BestSupplyRate from "components/Dashboard/BestSupplyRate";
import InvestmentStats from "components/Dashboard/InvestmentStats";
import { UserBalance, BestSupplyRates, UserInvestmentStats } from "services";


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
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          <Row>
            <Col md={4}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5> <FontAwesomeIcon icon={faBalanceScale} /> Balance</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Card Subtitle</CardSubtitle><br />
                  <Balance datas={balance} />
                </CardBody>
              </Card>
            </Col>
            <Col md={5}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5> <FontAwesomeIcon icon={faWallet} /> Investment Stats</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Card Subtitle</CardSubtitle><br />
                  <InvestmentStats datas={investmentStats} />
                </CardBody>
              </Card>
            </Col>
            <Col md={3}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5> <FontAwesomeIcon icon={faNewspaper} /> News</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Card Subtitle</CardSubtitle>
                  test
                </CardBody>
              </Card>
            </Col>
            <Col md={4}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5><FontAwesomeIcon icon={faHandHoldingUsd} /> Best supply rates</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Card Subtitle</CardSubtitle><br />
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
            <Col md={8}> 
              <Card className="card-width">
                <CardBody>
                  <CardTitle><h5><FontAwesomeIcon icon={faCalendarCheck} /> Daily Profits</h5></CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Card Subtitle</CardSubtitle><br />
                  <Row>
                  
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Dashboard;
