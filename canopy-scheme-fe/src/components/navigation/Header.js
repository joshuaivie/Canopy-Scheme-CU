import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "utils/auth";

export default ({ toggleModal }) => (
  <Navbar bg="white" fixed="top" variant="light" expand="lg">
    <Navbar.Brand as="h3" className="primary-text" href="/">
      <Link to="/" className="primary-text">
        Peculiar
      </Link>
    </Navbar.Brand>
    {isLoggedIn() ? (
      <Link to="/app" className="nav-link">
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
