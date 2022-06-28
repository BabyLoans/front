import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SupplyModal(props) {
  const { datas, actionButtonText, onActionButtonClick } = props;
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
          <Button color="dark" size="sm" onClick={onActionButtonClick}>
            {actionButtonText} <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </td>
      </tr>
    </>
  );
}

SupplyModal.propTypes = {
  datas: propTypes.object.isRequired,
  onActionButtonClick: propTypes.func,
  actionButtonText: propTypes.string.isRequired,
};

SupplyModal.defaultProps = {
  onActionButtonClick: () => {
    // Do nothing
  },
};

export default SupplyModal;
