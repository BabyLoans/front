import React from "react";
import { useMoralis } from "react-moralis";
import { UserBalance, Comptroller, BToken } from "services";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BalanceSupplyBorrowChart from "components/Loans/BalanceSupplyBorrow";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  Progress,
  Alert,
} from "reactstrap";
import LoansTable from "components/Loans/LoansTable";

function Loans() {
  const { isAuthenticated, web3, isWeb3Enabled, account } = useMoralis();

  const [balance, setBalance] = React.useState([]);

  const [bTokens, setBTokens] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    loadBTokens();
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

  const loadBTokens = async () => {
    if (isLoading || isWeb3Enabled) {
      let contracts = await Comptroller.fetchBTokenContracts(web3);

      let tokens = [];

      for (let contract of contracts) {
        tokens.push(await BToken.fetchBTokenInfos(web3, contract, account));
      }

      console.log(tokens);

      setBTokens(tokens);
    }
  };

  return (
    <>
      <Container>
        <br />
        <Row>
          <Col md={12}>
            <Card className="card-width">
              <CardBody>
                <Row>
                  {isAuthenticated ? (
                    <>
                      {isLoading ? (
                        <center>
                          <Spinner animation="border" variant="primary" />
                        </center>
                      ) : (
                        <>
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
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Col>
                        <Alert color="danger">
                          <FontAwesomeIcon icon={faWallet} /> Wallet not
                          connected
                        </Alert>
                      </Col>
                    </>
                  )}
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
            <LoansTable
              bTokens={bTokens}
              cardTitle="Supply"
              reloadBTokens={loadBTokens}
              cardSubtitle="Supply your assets on the BSC blockchain"
              onFirstActionValidate={async (bToken, input) => {
                BToken.mint(web3, bToken, input, account);
              }}
              onSecondActionValidate={async (bToken, input) => {
                BToken.redeem(web3, bToken, input, account);
              }}
              getMaxInputFirstAction={(bToken) => {
                return bToken.underlyingToken.balanceOf;
              }}
              getMaxInputSecondAction={(bToken) => {
                return bToken.balanceOf;
              }}
            />
          </Col>

          <Col md={6}>
            <LoansTable
              bTokens={bTokens}
              cardTitle="Borrow"
              reloadBTokens={loadBTokens}
              cardSubtitle="Borrow assets on the BSC blockchain"
              onFirstActionValidate={async (bToken, input) => {}}
              onSecondActionValidate={async (bToken, input) => {}}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Loans;
