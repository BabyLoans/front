import React from "react";
import { useMoralis } from "react-moralis";
import { Comptroller, BToken } from "services";
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

  const [balanceByBTokens, setBalanceByBTokens] = React.useState([]);

  const [bTokens, setBTokens] = React.useState();
  const [accountInfo, setAccountInfo] = React.useState({
    supply: 0,
    borrow: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    loadBTokens();
    loadAccountInfo();
    loadBTokensAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isWeb3Enabled]);

  const loadBTokens = async () => {
    if (isLoading || isWeb3Enabled) {
      let contracts = await Comptroller.fetchBTokenContracts(web3);

      let tokens = [];

      for (let contract of contracts) {
        tokens.push(await BToken.fetchBTokenInfos(web3, contract, account));
      }
      console.log(tokens);

      setBTokens(tokens);
      setIsLoading(false);
    }
  };

  const loadAccountInfo = async () => {
    if (isLoading || isWeb3Enabled) {
      let accountUser = await Comptroller.getAccountInfo(web3, account);
      setAccountInfo({
        supply: accountUser["supply"],
        borrow: accountUser["borrow"],
      });
      setIsLoading(false);
    }
  };

  const loadBTokensAccountInfo = async () => {
    if (isLoading || isWeb3Enabled) {
      let bTokensAccountInfo = await Comptroller.getBTokensAccountInfo(web3, account);
      setBalanceByBTokens(bTokensAccountInfo);
      setIsLoading(false);
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
                            <p className="mb-2">$ {accountInfo.supply}</p>
                            <Progress
                              color="success"
                              value={accountInfo.supply}
                              max={5000}
                            />
                          </Col>
                          <Col xs={8}>
                            <BalanceSupplyBorrowChart datas={balanceByBTokens} />
                          </Col>
                          <Col xs={2}>
                            <h5>Your borrow</h5>
                            <p className="mb-2">$ {accountInfo.borrow}</p>
                            <Progress
                              color="success"
                              value={accountInfo.borrow}
                              max={5000}
                            />
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
              cardSubtitle="Supply your assets on the blockchain"
              onFirstActionValidate={async (bToken, input) => {
                BToken.mint(web3, bToken.contract, input, account);
              }}
              onSecondActionValidate={async (bToken, input) => {
                BToken.redeem(web3, bToken.contract, input, account);
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
              cardSubtitle="Borrow assets on the blockchain"
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
