import React from "react";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import { useMoralis } from "react-moralis";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function SupplyTable(props) {
  const { bTokens } = props;
  const { account, isAuthenticated } = useMoralis();

  const [modalBToken, setModalBToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalIsLoading, setModalIsLoading] = React.useState(false);

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
              bToken={token}
              actionButtonText="Supply"
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
        isLoading={modalIsLoading}
        firstActionTitle="SUPPLY"
        secondActionTitle="WITHDRAW"
        onCancel={() => {
          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onFirstActionValidate={async () => {
          // Call smart contract

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onSecondActionValidate={async () => {
          // Call smart contract

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onEnableActionValidate={async () => {
          // Call smart contract

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
      />
    </>
  );
}

SupplyTable.propTypes = {
  bTokens: propTypes.array,
};

export default SupplyTable;
