import React from "react";
import { BToken } from "services";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import { useMoralis } from "react-moralis";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function SupplyTable(props) {
  const { bTokens } = props;
  const { web3, account, isAuthenticated } = useMoralis();

  const [modalBToken, setModalBToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalIsLoading, setModalIsLoading] = React.useState(false);

  // "Confirm" or "Enable"
  const [modalValidateButtonText, setModalValidateButtonText] =
    React.useState("Confirm");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    if (modalBToken) {
      let allowance = await BToken.totalAllowanceUnderlyingContract(
        web3,
        modalBToken.contract
      );

      if (allowance === 0) {
        setModalValidateButtonText("Enable");
      } else {
        setModalValidateButtonText("Confirm");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalBToken]);

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
        firstActionTitle="SUPPLY"
        secondActionTitle="WITHDRAW"
        validateButtonText={modalValidateButtonText}
        onCancel={() => {
          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onFirstActionValidate={async () => {
          // Call smart contract
          if (modalValidateButtonText === "Enable") {
            BToken.approveUnderlyingContract(web3, modalBToken, account);
          }

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onSecondActionValidate={async () => {
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
