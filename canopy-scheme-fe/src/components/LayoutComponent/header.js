import React from "react";

import AuthModal from "../AuthComponents/authModal";

import { Navbar, Nav } from "react-bootstrap";

class Header extends React.Component {
	state = {
		showAuthModal: false,
		form: "Login"
	};

	setForm = form => {
		this.setState({ form });
	};

	toggleModal = () => {
		const { showAuthModal } = this.state;
		this.setState({ showAuthModal: !showAuthModal });
	};

	render() {
		const { showAuthModal, form } = this.state;

		return (
			<React.Fragment>
				<Navbar bg="transparent" fixed="top" variant="light" expand="lg">
					<Navbar.Brand as="h3" href="/">
						<p className="dark-text">The Peculiar set</p>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto" />
						<Nav.Link
							onClick={() => {
								this.setForm("Register");
								this.toggleModal();
							}}
						>
							Register
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								this.setForm("Login");
								this.toggleModal();
							}}
						>
							Login
						</Nav.Link>
					</Navbar.Collapse>
				</Navbar>
				<AuthModal
					show={showAuthModal}
					toggleModal={this.toggleModal}
					form={form}
				/>
			</React.Fragment>
		);
	}
}

export default Header;
