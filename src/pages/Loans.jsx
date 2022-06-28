import React from "react";
import BalanceSupplyBorrowChart from "components/Loans/BalanceSupplyBorrow";
import { UserSupply, UserBorrow, UserBalance, BestSupplyRates } from "services";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  Progress,
} from "reactstrap";
import SupplyTable from "components/Loans/SupplyTable";
import BorrowTable from "components/Loans/BorrowTable";

function Loans() {
  const [balance, setBalance] = React.useState([]);
  //const [supply, setSupply] = React.useState([]);
  //const [borrow, setBorrow] = React.useState([]);
  const [bestSupplyRates, setBestSupplyRates] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      let promises = [
        UserBalance.get(),
        BestSupplyRates.get(),
        // UserSupply.get(),
        // UserBorrow.get()
      ];

      Promise.all(promises).then((values) => {
        setBalance(values[0]);
        setBestSupplyRates(values[1]);
        // setSupply(values[1]);
        // setBorrow(values[2]);
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
                <Card className="card-width">
                  <CardBody>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <td style={{ float: "left" }}>
                          <h6>Your deposit</h6>
                          <p className="mb-2 text-muted">$ 5000.00</p>
                          <Progress color="success" value={2500} max={5000} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <BalanceSupplyBorrowChart datas={balance} />
                        </td>
                        <td style={{ textAlign: "right", float: "right" }}>
                          <h6>Your borrow</h6>
                          <p className="mb-2 text-muted">$ 5000.00</p>
                          <Progress color="success" value={1300} max={5000} />
                        </td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <Col md={6}>
                <SupplyTable bestSupplyRates={bestSupplyRates} />
              </Col>

              <Col md={6}>
                <BorrowTable bestSupplyRates={bestSupplyRates} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Loans;
