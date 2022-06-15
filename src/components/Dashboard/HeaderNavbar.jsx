import React from 'react';
import {
  Collapse,
  Navbar,
  Button,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

import Account from 'components/Account/Account';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartPie, faCogs, faBell, faBars } from "@fortawesome/free-solid-svg-icons";

export default class HeaderNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img
              className="img-fluid rounded-circle"
              src={require("assets/img/bbl_logo.png").default}
              style={{ width: "35px", display: "inline" }}
            /> PageName
          </NavbarBrand>
          <Collapse style={{ flexGrow: "0" }} navbar>
            <Nav navbar>
              <NavLink style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} href="/dashboard" >
              <Button color="dark" size="sm"> 
                <FontAwesomeIcon icon={faHome}/>
              </Button>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} href="/loans" >
                <Button color="dark" size="sm"> 
                  <FontAwesomeIcon icon={faChartPie}/>
                </Button>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.85)" }} href="/settings" >
                <Button color="dark" size="sm"> 
                  <FontAwesomeIcon icon={faCogs}/>
                </Button>
              </NavLink>
              <NavLink>
                <Account />
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
