import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailAddress: "",
			password: "",
			isLoading: false,
			isValidated: false
		};
	}

	handlePasswordToggle = () => {
		const input = document.querySelector("#password");
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			this.setState({ isLoading: true });
		}
		this.setState({ isValidated: true });
		this.login();
	};

	async login() {
		try {
			const { emailAddress, password } = this.state;
			console.log(emailAddress, password);
			//TODO: await function from endpoint
		} catch (err) {
			this.setState({ isLoading: false });
		}
	}

	render() {
		const { emailAddress, password, isLoading } = this.state;
		if (isLoading) {
			return <Spinner animation="border" variant="primary" />;
		}
		return (
			<React.Fragment>
				<section className="auth-container">
					<h3>Login</h3>
					<Form
						noValidate
						validated={this.state.isValidated}
						onSubmit={this.handleChange}
					>
						<Form.Group>
							<Form.Control
								autoFocus
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

						{/* Password */}
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
							<Form.Control.Feedback type="invalid">
								Please provide a valid password
							</Form.Control.Feedback>
						</Form.Group>
					</Form>
					<Button type="submit" onClick={this.handleSubmit}>
						Login
					</Button>
				</section>
			</React.Fragment>
		);
	}
}

export default Login;
