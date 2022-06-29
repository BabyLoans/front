import React from "react";
import { BToken } from "services";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import { useMoralis } from "react-moralis";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function SupplyTable(props) {
  const { tokens } = props;
  const { web3, account, isAuthenticated } = useMoralis();

  const [modalToken, setModalToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // "Confirm" or "Enable"
  const [modalValidateButtonText, setModalValidateButtonText] =
    React.useState("Confirm");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    if (modalToken) {
      let allowance = await BToken.totalAllowanceUnderlyingContract(
        web3,
        modalToken
      );

      if (allowance === 0) {
        setModalValidateButtonText("Enable");
      } else {
        setModalValidateButtonText("Confirm");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalToken]);

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
                if (isAuthenticated && account) {
                  setModalToken(token);
                  setModalIsOpen(true);
                } else {
                  alert("Please connect before using supply functions");
                }
              }}
            />
          );
        }}
        tokens={tokens}
      />
      <LoansModal
        bodyTitle="SUPPLY"
        bodyTitleAction="WITHDRAW"
        token={modalToken}
        modalIsOpen={modalIsOpen}
        validateButtonText={modalValidateButtonText}
        onCancel={() => {
          setModalIsOpen(false);
        }}
        onValidate={async () => {
          // Call smart contract
          if (modalValidateButtonText === "Enable") {
            BToken.approveUnderlyingContract(web3, modalToken, account);
          }

          setModalIsOpen(false);
        }}
      />
    </>
  );
}

SupplyTable.propTypes = {
  tokens: propTypes.array,
};

export default SupplyTable;
