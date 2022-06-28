import React from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
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

function BorrowModal(props) {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const { datas } = props;

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
          <Button color="dark" size="sm" onClick={toggle}>
            BORROW <FontAwesomeIcon icon={faMinusCircle} />
          </Button>
        </td>
      </tr>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 250 }}>
        <ModalHeader toggle={toggle}>
          <div style={{ display: "inline-flex" }}>
            <img
              alt="logo coin"
              className="img-center img-fluid"
              src={datas.logoUrl}
              style={{ width: "30%" }}
            />
            &nbsp;<b>{datas.symbol}</b>
          </div>
        </ModalHeader>

        <ModalBody>
          <center>
            <h1>BORROW</h1>
            <br />
            <InputGroup>
              <Input
                placeholder="00.00"
                type="number"
                style={{ width: "25%" }}
              />
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
                    src={datas.logoUrl}
                    style={{ width: "30px" }}
                  />
                </th>
                <td>Borrow APY</td>
                <td>{datas.rates[0].value} %</td>
              </tr>
              <tr>
                <th scope="row">
                  <img
                    alt="token_image"
                    style={{ width: "30px" }}
                    className=" img-fluid rounded-circle"
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
          <Button color="dark" onClick={toggle}>
            Borrowing
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

BorrowModal.propTypes = {
  datas: propTypes.object.isRequired,
};

export default BorrowModal;
