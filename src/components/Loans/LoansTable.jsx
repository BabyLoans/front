import React from "react";
import { BToken } from "services";
import propTypes from "prop-types";
import LoansModal from "./LoansModal";
import { useMoralis } from "react-moralis";
import LoansBaseContainer from "./LoansBaseTable";
import LoansTableRow from "components/Loans/LoansTableRow";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

function LoansTable(props) {
  const {
    bTokens,
    cardTitle,
    reloadBTokens,
    cardSubtitle,
    onFirstActionValidate,
    onSecondActionValidate,
  } = props;
  const { web3, account, isAuthenticated } = useMoralis();

  const [modalBToken, setModalBToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalIsLoading, setModalIsLoading] = React.useState(false);

  const [bTokensIsReloading, setBTokensIsReloading] = React.useState(false);

  React.useEffect(() => {
    if (bTokensIsReloading) {
      reloadBTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bTokensIsReloading]);

  return (
    <>
      <LoansBaseContainer
        cardIcon={faSackDollar}
        cardTitle={cardTitle}
        cardSubtitle={cardSubtitle}
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
        onFirstActionValidate={async (input) => {
          // Call smart contract
          await onFirstActionValidate(web3, input);

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onSecondActionValidate={async (input) => {
          // Call smart contract
          await onSecondActionValidate(web3, input);

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onEnableActionValidate={async () => {
          // Call smart contract
          setModalIsLoading(true);
          try {
            await BToken.approveUnderlyingContract(
              web3,
              modalBToken.contract,
              account
            );
            setBTokensIsReloading(true);
          } catch (e) {
            console.log(e);
            alert("A error as been intercepted");
          } finally {
            setModalIsOpen(false);
            setModalIsLoading(false);
          }
        }}
      />
    </>
  );
}

LoansTable.propTypes = {
  bTokens: propTypes.array,
  onFirstActionValidate: propTypes.func,
  onSecondActionValidate: propTypes.func,
  cardTitle: propTypes.string.isRequired,
  reloadBTokens: propTypes.func.isRequired,
  cardSubtitle: propTypes.string.isRequired,
};

LoansTable.defaultProps = {
  onFirstActionValidate: () => {
    // Do nothing
  },
  onSecondActionValidate: () => {
    // Do nothing
  },
};

export default LoansTable;
