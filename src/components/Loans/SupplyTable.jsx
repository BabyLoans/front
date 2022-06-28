import React from "react";
import propTypes from "prop-types";
import LoansBaseContainer from "./LoansBaseTable";
import SupplyTableRow from "components/Loans/SupplyTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function SupplyTable(props) {
  const { bestSupplyRates } = props;
  return (
    <LoansBaseContainer
      cardIcon={faSackDollar}
      cardTitle="Supply"
      cardSubtitle="Supply your assets on the BSC blockchain"
      generateTableRow={(token) => {
        return <SupplyTableRow datas={token} />;
      }}
      bestSupplyRates={bestSupplyRates}
    />
  );
}

SupplyTable.propTypes = {
  bestSupplyRates: propTypes.array.isRequired,
};

export default SupplyTable;
