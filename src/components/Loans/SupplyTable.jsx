import React from "react";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function SupplyTable(props) {
  const { bestSupplyRates } = props;

  const [modalToken, setModalToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // "Confirm" or "Enable"
  const [modalValidateButtonText, setModalValidateButtonText] =
    React.useState("Confirm");

  return (
    <>
      <LoansBaseContainer
        cardIcon={faSackDollar}
        cardTitle="Supply"
        cardSubtitle="Supply your assets on the BSC blockchain"
        generateTableRow={(token, index) => {
          return (
            <LoansTableRow
              key={`SupplyRow_${index}`}
              datas={token}
              actionButtonText="Supply"
              onAction={() => {
                setModalToken(token);
                setModalIsOpen(true);
              }}
            />
          );
        }}
        bestSupplyRates={bestSupplyRates}
      />
      <LoansModal
        bodyTitle="SUPPLY"
        token={modalToken}
        modalIsOpen={modalIsOpen}
        validateButtonText={modalValidateButtonText}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onValidate={() => {
          // Call smart contract
          setModalIsOpen(false);
        }}
      />
    </>
  );
}

SupplyTable.propTypes = {
  bestSupplyRates: propTypes.array.isRequired,
};

export default SupplyTable;
