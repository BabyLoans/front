import React from "react";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

function BorrowTable(props) {
  const { bestSupplyRates } = props;

  const [modalToken, setModalToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <>
      <LoansBaseContainer
        cardIcon={faHandHoldingUsd}
        cardTitle="Borrow"
        cardSubtitle="Borrow assets on the BSC blockchain"
        generateTableRow={(token, index) => {
          return (
            <LoansTableRow
              key={`BorrowRow_${index}`}
              datas={token}
              actionButtonText="Borrow"
              onActionButtonClick={() => {
                setModalToken(token);
                setModalIsOpen(true);
              }}
            />
          );
        }}
        bestSupplyRates={bestSupplyRates}
      />
      <LoansModal
        bodyTitle="BORROW"
        token={modalToken}
        modalIsOpen={modalIsOpen}
        validateButtonText="Borrowing"
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

BorrowTable.propTypes = {
  bestSupplyRates: propTypes.array.isRequired,
};

export default BorrowTable;
