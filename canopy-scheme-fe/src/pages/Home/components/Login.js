/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { AuthAction } from "actions";
import { Form, Button, Container } from "react-bootstrap";
import * as ROUTES from "routes";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errorMsg: {}
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ isLoading: true, errorMsg: {} });
    this.login();
    event.preventDefault();
  };

  async login() {
    try {
      await AuthAction.login({ ...this.state });
      window.location.href = ROUTES.APP;
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }

  render() {
    const { email, password, isLoading, errorMsg } = this.state;
    const { switchForm } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {errorMsg.email ? <p className="form-error-msg">{errorMsg.email}</p> : null}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {errorMsg.password ? (
            <p className="form-error-msg">{errorMsg.password}</p>
          ) : null}

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-center"
          >
            Login
          </Button>

          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              onClick={() => {
                switchForm("register");
              }}
              style={{
                textDecoration: "underline",
                fontStyle: "italic",
                cursor: "grabbing"
              }}
            >
              Register
            </span>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Login;
