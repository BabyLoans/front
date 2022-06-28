import React from "react";
import propTypes from "prop-types";
import LoansBaseContainer from "./LoansBaseTable";
import BorrowTableRow from "components/Loans/BorrowTableRow";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

function BorrowTable(props) {
  const { bestSupplyRates } = props;
  return (
    <LoansBaseContainer
      cardIcon={faHandHoldingUsd}
      cardTitle="Borrow"
      cardSubtitle="Borrow assets on the BSC blockchain"
      generateTableRow={(token) => {
        return <BorrowTableRow datas={token} />;
      }}
      bestSupplyRates={bestSupplyRates}
    />
  );
}

BorrowTable.propTypes = {
  bestSupplyRates: propTypes.array.isRequired,
};

export default BorrowTable;
