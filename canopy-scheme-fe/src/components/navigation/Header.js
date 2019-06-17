import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "utils/auth";
import logo from "assets/img/full-logo.png";
import * as ROUTES from "routes";

export default ({ toggleModal }) => (
  <Navbar bg="white" fixed="top" variant="light" expand="lg">
    <Navbar.Brand as="h3" className="primary-text">
      <Link to={ROUTES.APP} className="primary-text">
        <img src={logo} alt="Perculiar set logo" width={150} />
      </Link>
    </Navbar.Brand>
    {isLoggedIn() ? (
      <Link to={ROUTES.APP} className="nav-link">
        Dashboard
      </Link>
    ) : (
      <Nav.Link onClick={() => toggleModal()}>
        <FontAwesomeIcon className="primary-text" icon="sign-in-alt" />
        &nbsp;Login/Register
      </Nav.Link>
    )}
  </Navbar>
);
