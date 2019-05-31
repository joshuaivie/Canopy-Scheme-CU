import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "../../utils/auth";

export default ({ toggleModal }) => (
  <Navbar bg="white" fixed="top" variant="light" expand="lg">
    <Navbar.Brand as="h3" href="/">
      <p className="dark-text">The Peculiar set</p>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto" />
      {isLoggedIn() ? (
        <Link to="/app">Dashboard</Link>
      ) : (
        <Nav.Link
          onClick={() => {
            toggleModal();
          }}
        >
          Login/Register &nbsp;
          <FontAwesomeIcon className="primary-text" icon="sign-in-alt" />
        </Nav.Link>
      )}
    </Navbar.Collapse>
  </Navbar>
);
