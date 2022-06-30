import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoansTableRow(props) {
  const { bToken, actionButtonText, onAction } = props;

  const [isActionSelected, setIsActionSelected] = React.useState(false);

  React.useEffect(() => {
    if (isActionSelected) {
      onAction();
      setIsActionSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActionSelected]);

  return (
    <>
      <tr className="text-white">
        <th scope="row">
          <img
            alt={`${bToken.underlyingToken.name}_logo`}
            className="img-center img-fluid"
            src={bToken.underlyingToken.logoUrl}
            style={{ width: "25px" }}
          />
        </th>
        <td>{bToken.underlyingToken.symbol}</td>
        <td>{bToken.rate} %</td>
        <td>
          <Button
            color="dark"
            size="sm"
            onClick={() => {
              setIsActionSelected(true);
            }}
          >
            {actionButtonText} <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </td>
      </tr>
    </>
  );
}

LoansTableRow.propTypes = {
  onAction: propTypes.func,
  bToken: propTypes.object.isRequired,
  actionButtonText: propTypes.string.isRequired,
};

LoansTableRow.defaultProps = {
  onAction: () => {
    // Do nothing
  },
};

export default LoansTableRow;
