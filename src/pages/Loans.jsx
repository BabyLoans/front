import React from "react";
import { UserSupply, UserBorrow, UserBalance } from "services";
import BalanceSupplyBorrowChart from "components/Loans/BalanceSupplyBorrow";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  Progress,
} from "reactstrap";
import { TokenLending } from "services";
import SupplyTable from "components/Loans/SupplyTable";
import BorrowTable from "components/Loans/BorrowTable";
import { useMoralis } from "react-moralis";

function Loans() {
  const { web3, isWeb3Enabled } = useMoralis();

  const [balance, setBalance] = React.useState([]);

  const [tokens, setTokens] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    if (isLoading || isWeb3Enabled) {
      let tokensTmp = await TokenLending.fetchTokens(web3);
      console.log(tokensTmp);
      setTokens(tokensTmp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isWeb3Enabled]);

  React.useEffect(() => {
    if (isLoading) {
      let promises = [UserBalance.get()];

      Promise.all(promises).then((values) => {
        setBalance(values[0]);
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
              <Col md={12}>
                <Card className="card-width" style={{ borderRadius: "24px", backgroundColor: "rgb(30 32 49)"}}>
                  <CardBody>
                    <Row>
                      <Col xs={2}>
                        <h5>Your deposit</h5>
                        <p className="mb-2">$ 5000.00</p>
                        <Progress color="success" value={2500} max={5000} />
                      </Col>
                      <Col xs={8}>
                        <BalanceSupplyBorrowChart datas={balance} />
                      </Col>
                      <Col xs={2}>
                        <h5>Your borrow</h5>
                        <p className="mb-2">$ 5000.00</p>
                        <Progress color="success" value={1300} max={5000} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <Col md={6}>
                <SupplyTable tokens={tokens} />
              </Col>

              <Col md={6}>
                <BorrowTable tokens={tokens} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Loans;
