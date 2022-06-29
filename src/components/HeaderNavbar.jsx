import React from "react";
import {
  Collapse,
  Navbar,
  Button,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import Account from "components/Account/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartPie, faCogs } from "@fortawesome/free-solid-svg-icons";

function HeaderNavbar() {
  const [actualPage, setActualPage] = React.useState("Dashboard");
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            alt="babyloans_logo"
            className="img-fluid rounded-circle"
            src={require("assets/img/bbl_logo.png").default}
            style={{ width: "35px", display: "inline" }}
          />{" "}
          {actualPage}
        </NavbarBrand>
        <Collapse style={{ flexGrow: "0" }} navbar>
          <Nav navbar>
            <Link
              style={{}}
              to="/dashboard"
              onClick={() => setActualPage("Dashboard")}
            >
              <Button color="dark" size="sm">
                <FontAwesomeIcon icon={faHome} />
              </Button>
            </Link>
            <Link
              style={{}}
              to="/loans"
              onClick={() => setActualPage("Supply / Borrow")}
            >
              <Button color="dark" size="sm">
                <FontAwesomeIcon icon={faChartPie} />
              </Button>
            </Link>
            <Link
              style={{}}
              to="/settings"
              onClick={() => setActualPage("Settings")}
            >
              <Button color="dark" size="sm">
                <FontAwesomeIcon icon={faCogs} />
              </Button>
            </Link>
            <Account />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderNavbar;
