import React from 'react';

import Supply from "components/Loans/Supply";
import Borrow from "components/Loans/Borrow";
import BalanceSupplyBorrowChart from "components/Loans/BalanceSupplyBorrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { UserSupply, UserBorrow, UserBalance, BestSupplyRates } from "services";
import { Container, Card, CardBody, CardSubtitle, CardTitle, Row, Col, Spinner, Progress, Table } from "reactstrap";

function Loans() {

    const [balance, setBalance] = React.useState([]);
    const [supply, setSupply] = React.useState([]);
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
                                <table style={{ width : "100%" }}>
                                    <tr>
                                        <td style={{ float: "left" }}>
                                            <h6>Your deposit</h6>
                                            <p className="mb-2 text-muted">$ 5000.00</p>
                                            <Progress color="success" value={ 2500 } max={ 5000 }/>
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <BalanceSupplyBorrowChart datas={balance} />
                                        </td>
                                        <td style={{ textAlign: "right", float: "right" }}>
                                            <h6>Your borrow</h6>
                                            <p className="mb-2 text-muted">$ 5000.00</p>
                                            <Progress color="success" value={ 1300 } max={ 5000 } />
                                        </td> 
                                    </tr>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row><br /></Row>
                <Row>
                    <Col md={6}> 
                        <Card className="card-width">
                            <CardBody>
                                <CardTitle><h5> <FontAwesomeIcon icon={faSackDollar} /> Supply</h5></CardTitle>
                                <CardSubtitle className="mb-2 text-muted">Supply your assets on the BSC blockchain</CardSubtitle><br />
                                <Table>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>ASSETS</th>
                                        <th>APY</th>
                                        <th>ACTION</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {bestSupplyRates.map((token) => {
                                            return (
                                                <Supply datas={token} />
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={6}> 
                        <Card className="card-width">
                            <CardBody>
                                <CardTitle><h5> <FontAwesomeIcon icon={faHandHoldingUsd} /> Borrow</h5></CardTitle>
                                <CardSubtitle className="mb-2 text-muted">Borrow assets on the BSC blockchain</CardSubtitle><br />
                                <Table style={{ width: "100%"}} >
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>ASSETS</th>
                                        <th>APY</th>
                                        <th>ACTION</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {bestSupplyRates.map((token) => {
                                            return (
                                                <Borrow datas={token} />
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </>
        )}
    </>
  );
}

export default Loans;