import React from "react";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import { useMoralis } from "react-moralis";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

function BorrowTable(props) {
  const { bTokens } = props;
  const { account, isAuthenticated } = useMoralis();

  const [modalBToken, setModalBToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalIsLoading, setModalIsLoading] = React.useState(false);

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
              bToken={token}
              actionButtonText="Borrow"
              onAction={() => {
                if (isAuthenticated && account) {
                  setModalBToken(token);
                  setModalIsOpen(true);
                } else {
                  alert("Please connect before using supply functions");
                }
              }}
            />
          );
        }}
        bTokens={bTokens}
      />
      <LoansModal
        bToken={modalBToken}
        modalIsOpen={modalIsOpen}
        firstActionTitle="BORROW"
        secondActionTitle="REPAY"
        validateButtonText="Borrowing"
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onFirstActionValidate={() => {
          // Call smart contract
          setModalIsOpen(false);
        }}
        onSecondActionValidate={() => {
          // Call smart contract
          setModalIsOpen(false);
        }}
      />
    </>
  );
}

BorrowTable.propTypes = {
  bTokens: propTypes.array,
};

export default BorrowTable;
