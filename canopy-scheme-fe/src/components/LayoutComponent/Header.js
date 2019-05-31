import React from "react";
import { Link } from "react-router-dom";
import AuthModal from "../AuthComponents/AuthModal";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn } from "../../utils/auth";

class Header extends React.Component {
  state = {
    showAuthModal: false
  };

  toggleModal = () => {
    const { showAuthModal } = this.state;
    this.setState({ showAuthModal: !showAuthModal });
  };

  render() {
    const { showAuthModal } = this.state;

    return (
      <React.Fragment>
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
                  this.toggleModal();
                }}
              >
                Login/Register &nbsp;
                <FontAwesomeIcon className="primary-text" icon="sign-in-alt" />
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
        <AuthModal show={showAuthModal} toggleModal={this.toggleModal} />
      </React.Fragment>
    );
  }
}

export default Header;
