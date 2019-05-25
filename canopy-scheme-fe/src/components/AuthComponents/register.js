import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Register extends React.Component {
	state = {
		emailAddress: "",
		password: "",
		matriculationNumber: "",

		isLoading: false,
		isValidated: false
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.setState({ isValidated: true });
		this.register();
	};

	handlePasswordToggle = () => {
		var input = document.getElementById("password");
		var eyeIcon = document.getElementById("eyeIcon");
		if (input.type === "password") {
			input.type = "text";
			eyeIcon.classList.remove("fa-eye-slash");
			eyeIcon.classList.add("fa-eye");
		} else {
			input.type = "password";
			eyeIcon.classList.remove("fa-eye");
			eyeIcon.classList.add("fa-eye-slash");
		}
	};

	async register() {
		try {
			const { emailAddress, password, matriculationNumber } = this.state;
			console.log(
				`This is ${emailAddress}, ${password}, ${matriculationNumber}`
			);
		} catch (err) {
			console.error(err);
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		const {
			emailAddress,
			matriculationNumber,
			password,
			isLoading,
			isValidated
		} = this.state;
		if (isLoading) {
			return <Spinner animation="border" variant="primary" />;
		}
		return (
			<React.Fragment>
				<h3>Create Account</h3>
				<Form noValidate validated={isValidated} onSubmit={this.handleSubmit}>
					<p>Tell us a bit about yourself, We just need the basics.</p>
					<p className="next-action-text" style={{ display: "none" }}>
						Have an account already? <Link to="/login">Login</Link>
					</p>
					<Form.Group>
						<Form.Control
							size="md"
							type="email"
							placeholder="Email Address*"
							name="emailAddress"
							value={emailAddress}
							onChange={this.handleChange}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid email address
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Control
							size="md"
							type="text"
							placeholder="Matricualtion Number*"
							name="matriculationNumber"
							value={matriculationNumber}
							onChange={this.handleChange}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please enter your matriculation number
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Control
							size="md"
							id="password"
							type="password"
							placeholder="Password*"
							name="password"
							value={password}
							onChange={this.handleChange}
							required
						/>

						<FontAwesomeIcon
							id="eyeIcon"
							icon="eye"
							className="password-toggle-icon"
							onClick={this.handlePasswordToggle}
						/>
					</Form.Group>
					<Button type="submit" size="md" onClick={this.handleSubmit} block>
						Create Account
					</Button>
				</Form>
			</React.Fragment>
		);
	}
}
