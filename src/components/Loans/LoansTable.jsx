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
    cardSubtitle,
    reloadBTokens,
    firstActionTitle,
    secondActionTitle,
    onFirstActionValidate,
    onSecondActionValidate,
    getMaxInputFirstAction,
    getMaxInputSecondAction,
  } = props;
  const { web3, account, isAuthenticated } = useMoralis();

  const [modalBToken, setModalBToken] = React.useState();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalIsLoading, setModalIsLoading] = React.useState(false);

  const [bTokensIsReloading, setBTokensIsReloading] = React.useState(false);

  React.useEffect(() => {
    if (bTokensIsReloading) {
      reloadBTokens();
      setBTokensIsReloading(false);
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
              actionButtonText={cardTitle}
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
        getMaxInput={(mode) => {
          if (mode === 0) {
            return getMaxInputFirstAction(modalBToken);
          }

          return getMaxInputSecondAction(modalBToken);
        }}
        firstActionTitle={firstActionTitle}
        secondActionTitle={secondActionTitle}
        onCancel={() => {
          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onFirstActionValidate={async (input) => {
          // Call smart contract
          await onFirstActionValidate(modalBToken, input);

          setBTokensIsReloading(true);

          setModalIsOpen(false);
          setModalIsLoading(false);
        }}
        onSecondActionValidate={async (input) => {
          // Call smart contract
          await onSecondActionValidate(modalBToken, input);

          setBTokensIsReloading(true);

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
  firstActionTitle: propTypes.string.isRequired,
  secondActionTitle: propTypes.string.isRequired,
  getMaxInputFirstAction: propTypes.func.isRequired,
  getMaxInputSecondAction: propTypes.func.isRequired,
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
