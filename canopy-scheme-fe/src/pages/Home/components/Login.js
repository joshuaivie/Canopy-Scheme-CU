/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link } from "react-router-dom";
import { AuthAction } from "actions";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import * as ROUTES from "routes";
import { successAlert } from "utils/notification";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMsg: {}
  };

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
      const msg = await AuthAction.login({ ...this.state });
      successAlert(msg);
      const {
        history: { push }
      } = this.props;
      window.setTimeout(function() {
        push(ROUTES.APP);
      }, 2000);
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
            className="btn-center btn-full-width"
          >
            {isLoading ? <Spinner animation="border" /> : "Login"}
          </Button>
          <br />
          <p className="text-center">
            <Link className="primary-text" to={ROUTES.FORGOT_PASSWORD}>
              Forgot password?
            </Link>
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="primary-text"
              onClick={() => {
                switchForm("register");
              }}
              style={{
                cursor: "pointer"
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
