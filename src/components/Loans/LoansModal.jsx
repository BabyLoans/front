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
  Row, Col, UncontrolledCollapse, Card, CardBody
} from "reactstrap";

function LoansModal(props) {
  const {
    token,
    onCancel,
    bodyTitle,
    bodyTitleAction,
    onValidate,
    modalIsOpen,
    validateButtonText,
  } = props;

  const [isCanceling, setIsCanceling] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const [isVisibleDetailAction, setIsVisibleDetailAction] = React.useState(true);
  const [isVisibleDetailAction2, setIsVisibleDetailAction2] = React.useState(false);
  const [valueAction2, setValueAction2] = React.useState([]);

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

  const handleChange = event => {
    // setMessage(event.target.value);

    setValueAction2(event.target.value);
  };

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
       
        <Row>
          <Col>
            <Button color="dark" id={bodyTitle} size="lg" block onClick={() => {
              setIsVisibleDetailAction(true);
              setIsVisibleDetailAction2(false);
            }}>
              {bodyTitle}
            </Button>
          </Col>
          <Col> 
            <Button color="secondary" id={bodyTitleAction} size="lg" block onClick={() => {
              setIsVisibleDetailAction(false);
              setIsVisibleDetailAction2(true);
            }}>
              {bodyTitleAction}
            </Button>
          </Col>
        </Row>
        
        <UncontrolledCollapse isOpen={isVisibleDetailAction} toggler={"#"+bodyTitle}>
          <Card>
            <CardBody>
              <br />
              <InputGroup>
                <Input placeholder="00.00" type="number" style={{ width: "25%" }} />
                <InputGroupText>$</InputGroupText>
              </InputGroup>
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
            </CardBody>
          </Card>
        </UncontrolledCollapse>

        <UncontrolledCollapse isOpen={isVisibleDetailAction2} toggler={"#"+bodyTitleAction}>
          <Card>
            <CardBody>
              <br />
              <label for="customRange" class="form-label">{bodyTitle} : 100 <b>{token?.symbol}</b></label><br />
              <label for="customRange" class="form-label">{bodyTitleAction} : {valueAction2}</label>
              <input type="range" class="form-range" id="customRange1" min="0" max="5" step={0.1} onChange={handleChange}></input>
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
            </CardBody>
          </Card>
        </UncontrolledCollapse>

          
      </ModalBody>
      <ModalFooter>
        <Button
          color="dark"
          onClick={() => {
            setIsValidating(true);
          }}
        >
          { isVisibleDetailAction ? validateButtonText :  bodyTitleAction }
        </Button>{" "}
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
