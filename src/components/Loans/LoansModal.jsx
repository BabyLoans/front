import React from "react";
import propTypes from "prop-types";
import {
  Input,
  Modal,
  Button,
  ModalBody,
  InputGroup,
  ModalHeader,
  ModalFooter,
  InputGroupText,
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";

function LoansModal(props) {
  const {
    bToken,
    onCancel,
    isLoading,
    modalIsOpen,
    getMaxInput,
    firstActionTitle,
    secondActionTitle,
    onFirstActionValidate,
    onSecondActionValidate,
    onEnableActionValidate,
  } = props;

  const [isCanceling, setIsCanceling] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);

  // 0 or 1
  const [selectedAction, setSelectedAction] = React.useState(0);
  const [inputValue, setInputValue] = React.useState(0);

  // "Confirm" or "Enable"
  const [isEnabledToken, setIsEnabledToken] = React.useState(false);

  React.useEffect(() => {
    if (isCanceling) {
      onCancel();
      setIsCanceling(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCanceling]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    if (isValidating) {
      if (isEnabledToken) {
        if (selectedAction === 0) {
          await onFirstActionValidate(inputValue);
        } else {
          await onSecondActionValidate(inputValue);
        }
      } else {
        await onEnableActionValidate();
      }
      setIsValidating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  React.useEffect(() => {
    if (bToken?.allowance > 0) {
      setIsEnabledToken(true);
      return;
    }
    setIsEnabledToken(false);
  }, [bToken]);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setInputValue(0);
    }
  }, [modalIsOpen]);

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
            src={bToken?.underlyingToken?.logoUrl}
            style={{ width: "30%" }}
          />
          &nbsp;<b>{bToken?.underlyingToken?.symbol}</b>
        </div>
      </ModalHeader>
      <ModalBody>
        {isEnabledToken ? (
          <>
            <Row>
              <Col>
                <Button
                  color={selectedAction === 0 ? "dark" : "secondary"}
                  id={firstActionTitle}
                  size="lg"
                  block
                  onClick={() => {
                    setSelectedAction(0);
                  }}
                >
                  {firstActionTitle}
                </Button>
              </Col>
              <Col>
                <Button
                  color={selectedAction === 1 ? "dark" : "secondary"}
                  id={secondActionTitle}
                  size="lg"
                  block
                  onClick={() => {
                    setSelectedAction(1);
                  }}
                >
                  {secondActionTitle}
                </Button>
              </Col>
            </Row>
            <Card className="mt-2">
              <CardBody>
                <InputGroup className="mt-2">
                  <Input
                    value={inputValue}
                    type="number"
                    style={{ width: "25%" }}
                    onChange={(event) => {
                      setInputValue(event.target.value);
                    }}
                  />
                  <InputGroupText>$</InputGroupText>
                </InputGroup>
                <br />
                <small>Max : {getMaxInput(selectedAction)}</small>{" "}
                <Button
                  size="sm"
                  onClick={() => {
                    setInputValue(getMaxInput(selectedAction));
                  }}
                >
                  Max
                </Button>
                <hr className="my-4" />
                {bToken?.rates?.map((rate) => {
                  return (
                    <Row>
                      <Col xs={2}>
                        <img
                          alt={`${rate?.symbol}_logo`}
                          className="img-center img-fluid"
                          src={rate?.logoUrl}
                          style={{ width: "30px" }}
                        />
                      </Col>
                      <Col>APY</Col>
                      <Col>{rate.value} %</Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
          </>
        ) : (
          <>
            <p>
              To {selectedAction === 0 ? firstActionTitle : secondActionTitle}{" "}
              {bToken?.underlyingToken.symbol} to the BabyLoans Protocol, you
              need to enable it first
            </p>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="dark"
          className="me-1"
          onClick={() => {
            setIsValidating(true);
          }}
        >
          {isLoading ? <Spinner /> : isEnabledToken ? "Confirm" : "Enable"}
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
  bToken: propTypes.object,
  onCancel: propTypes.func,
  isLoading: propTypes.bool.isRequired,
  onFirstActionValidate: propTypes.func,
  onSecondActionValidate: propTypes.func,
  onEnableActionValidate: propTypes.func,
  getMaxInput: propTypes.func.isRequired,
  modalIsOpen: propTypes.bool.isRequired,
  firstActionTitle: propTypes.string.isRequired,
  secondActionTitle: propTypes.string.isRequired,
};

LoansModal.defaultProps = {
  onCancel: () => {
    // Do nothing
  },
  onFirstActionValidate: () => {
    // Do nothing
  },
  onSecondActionValidate: () => {
    // Do nothing
  },
};

export default LoansModal;
