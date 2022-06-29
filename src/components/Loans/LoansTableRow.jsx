import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoansTableRow(props) {
  const { datas, actionButtonText, onAction } = props;

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
      <tr>
        <th scope="row">
          <img
            alt="logo coin"
            className="img-center img-fluid"
            src={datas.logoUrl}
            style={{ width: "25px" }}
          />
        </th>
        <td>{datas.symbol}</td>
        <td>{datas.rates[0].value} %</td>
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
  datas: propTypes.object.isRequired,
  actionButtonText: propTypes.string.isRequired,
};

LoansTableRow.defaultProps = {
  onAction: () => {
    // Do nothing
  },
};

export default LoansTableRow;
