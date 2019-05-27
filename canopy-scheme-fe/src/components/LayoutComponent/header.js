import React from 'react';

import LoginModal from '../AuthComponents/login';
import RegisterModal from '../AuthComponents/register';

import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
  state = {
    showLoginModal: false,
    showRegisterModal: false,
  };

  toggleModal = (modal) => {
    const { [modal]: modalVisibility } = this.state;
    this.setState({ [modal]: !modalVisibility });
  };

  render() {
    const { showLoginModal, showRegisterModal } = this.state;

    return (
      <React.Fragment>
        <Navbar bg="transparent" variant="light" expand="lg">
          <Navbar.Brand as="h3" href="/">
            <p className="dark-text">The Peculiar set</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" />
            {/* <Nav.Link>Pricing</Nav.Link>
          <Nav.Link>Groups</Nav.Link> */}
            <Nav.Link>Register</Nav.Link>
            <Nav.Link onClick={() => this.toggleModal('showLoginModal')}>Login</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal show={showLoginModal} toggleModal={() => this.toggleModal('showLoginModal')} />
      </React.Fragment>
    );
  }
}

export default Header;
