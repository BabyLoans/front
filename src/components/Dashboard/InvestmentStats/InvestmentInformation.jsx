import React from "react";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";

import propTypes from "prop-types";

function InvestmentInformation(props) {
  const { cardTitle, cardAmount } = props;

  return (
    <>
      <FontAwesomeIcon icon={faDonate} /> { ' '}
      {cardTitle} : { ' '}
      <Badge pill color="success">
        <b>
          $ {cardAmount}
        </b>
      </Badge><br /><br /><br />
    </>
  );
}

InvestmentInformation.propTypes = {
  cardTitle: propTypes.string.isRequired,
  cardAmount: propTypes.number.isRequired
};

export default InvestmentInformation;
