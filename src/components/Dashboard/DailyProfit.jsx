import React from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import DailyProfitChart from "../Charts/DailyProfitChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

function DailyProfit(props) {
    const { isAuthenticated } = props;

    return (
        <Container>
            <Row>
                <Col>
                    {!isAuthenticated? (
                        <>
                            <Alert color="danger">
                                <FontAwesomeIcon icon={faWallet} /> Wallet not connected
                            </Alert>
                        </>
                    ) : (
                        <>
                            <DailyProfitChart />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}


export default DailyProfit;