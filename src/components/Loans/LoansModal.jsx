import React from "react";
import propTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

function LoansModal(props) {
  const {
    token,
    bodyTitle,
    modalIsOpen,
    onCancelClick,
    onValidateClick,
    validateButtonText,
  } = props;

  return (
    <Modal isOpen={modalIsOpen} modalTransition={{ timeout: 250 }}>
      <ModalHeader toggle={onCancelClick()}>
        <div style={{ display: "inline-flex" }}>
          <img
            alt="logo coin"
            className="img-center img-fluid"
            src={token?.logoUrl}
            style={{ width: "30%" }}
          />
          &nbsp;<b>{token?.symbol}</b>
        </div>
      </ModalHeader>

      <ModalBody>
        <center>
          <h1>{bodyTitle}</h1>
          <br />
          <InputGroup>
            <Input placeholder="00.00" type="number" style={{ width: "25%" }} />
            <InputGroupText>$</InputGroupText>
          </InputGroup>
        </center>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>DETAILS</th>
              <th>APY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <img
                  alt="logo coin"
                  className="img-center img-fluid"
                  src={token?.logoUrl}
                  style={{ width: "30px" }}
                />
              </th>
              <td>Borrow APY</td>
              <td>{token?.rates?.[0].value} %</td>
            </tr>
            <tr>
              <th scope="row">
                <img
                  alt="token_image"
                  style={{ width: "30px" }}
                  className="img-fluid rounded-circle"
                  src={require("assets/img/bbl_logo.png").default}
                />
              </th>
              <td>Distribution APY</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="dark" onClick={onValidateClick()}>
          {validateButtonText}
        </Button>{" "}
        <Button color="secondary" onClick={onCancelClick()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

LoansModal.propTypes = {
  token: propTypes.object,
  onCancelClick: propTypes.func,
  onValidateClick: propTypes.func,
  bodyTitle: propTypes.string.isRequired,
  modalIsOpen: propTypes.bool.isRequired,
  validateButtonText: propTypes.string.isRequired,
};

export default LoansModal;
