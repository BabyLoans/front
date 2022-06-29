import React from "react";
import propTypes from "prop-types";
import {
  Input,
  Modal,
  Table,
  Button,
  ModalBody,
  InputGroup,
  ModalHeader,
  ModalFooter,
  InputGroupText,
  Spinner,
} from "reactstrap";

function LoansModal(props) {
  const {
    token,
    onCancel,
    isLoading,
    bodyTitle,
    onValidate,
    modalIsOpen,
    validateButtonText,
  } = props;

  const [isCanceling, setIsCanceling] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);

  React.useEffect(() => {
    if (isCanceling) {
      onCancel();
      setIsCanceling(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCanceling]);

  React.useEffect(() => {
    if (isValidating) {
      onValidate();
      setIsValidating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  return (
    <Modal isOpen={modalIsOpen} modalTransition={{ timeout: 250 }}>
      <ModalHeader
        toggle={() => {
          setIsCanceling(true);
        }}
      >
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
        <Button
          color="dark"
          className="me-1"
          onClick={() => {
            setIsValidating(true);
          }}
        >
          {isLoading ? <Spinner /> : validateButtonText}
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setIsCanceling(true);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

LoansModal.propTypes = {
  token: propTypes.object,
  onCancel: propTypes.func,
  onValidate: propTypes.func,
  bodyTitle: propTypes.string.isRequired,
  modalIsOpen: propTypes.bool.isRequired,
  validateButtonText: propTypes.string.isRequired,
};

LoansModal.defaultProps = {
  onCancel: () => {
    // Do nothing
  },
  onValidate: () => {
    // Do nothing
  },
};

export default LoansModal;
