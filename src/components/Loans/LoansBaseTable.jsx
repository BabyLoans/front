import React from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";

function LoansBaseTable(props) {
  const {
    cardIcon,
    cardTitle,
    cardSubtitle,
    generateTableRow,
    bestSupplyRates,
  } = props;

  return (
    <Card className="card-width">
      <CardBody>
        <CardTitle>
          <h5>
            {" "}
            <FontAwesomeIcon icon={cardIcon} /> {cardTitle}
          </h5>
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted">{cardSubtitle}</CardSubtitle>
        <br />
        <Table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th></th>
              <th>ASSETS</th>
              <th>APY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {bestSupplyRates.map((token) => generateTableRow(token))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

LoansBaseTable.propTypes = {
  cardIcon: propTypes.element.isRequired,
  cardTitle: propTypes.string.isRequired,
  cardSubtitle: propTypes.string.isRequired,
  generateTableRow: propTypes.func.isRequired,
  bestSupplyRates: propTypes.array.isRequired,
};

export default LoansBaseTable;
