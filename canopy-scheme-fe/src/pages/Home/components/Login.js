/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link } from "react-router-dom";
import { AuthAction } from "actions";
import { Form, Button, Container } from "react-bootstrap";
import * as ROUTES from "routes";
import { successAlert } from "utils/notification";
import { BtnLoadingSpinner } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMsg: {}
  };
  static contextType = NetworkAvailabilityContext;

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
      const { msg } = await AuthAction.login({ ...this.state });
      successAlert(msg);
      this.props.history.push(ROUTES.APP);
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }

  render() {
    const { email, password, isLoading, errorMsg } = this.state;
    const { switchForm, toggleModal } = this.props;
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
            {errorMsg.password ? (
              <p className="form-error-msg">{errorMsg.password}</p>
            ) : null}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || this.context.offline}
            className="btn-center btn-full-width"
          >
            {isLoading ? <BtnLoadingSpinner /> : "Login"}
          </Button>
          <br />
          <p className="text-center">
            <Link
              className="primary-text"
              to={ROUTES.FORGOT_PASSWORD}
              onClick={() => toggleModal()}
            >
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
