import React from "react";
import { Form, Button } from "react-bootstrap";
import { AuthAction } from "actions";
import Layout from "layouts";
import { successAlert } from "utils/notification";
import { BtnLoadingSpinner } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

import * as ROUTES from "routes";

class AdminLogin extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMsg: {}
  };
  static contextType = NetworkAvailabilityContext;

  componentDidMount() {
    this.props.toggleModal(false);
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
      const { msg } = await AuthAction.login({ ...this.state, isAdmin: true });
      successAlert(msg);
      this.props.history.push(ROUTES.ADMIN);
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }

  render() {
    const { email, password, isLoading, errorMsg } = this.state;
    const { toggleModal, history, showAuthModal } = this.props;
    return (
      <Layout toggleModal={toggleModal} history={history} showAuthModal={showAuthModal}>
        <div id="forgot-pasword-form">
          <h3 className="primary-text" style={{ textAlign: "center" }}>
            Admin Login
          </h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
              {errorMsg.email ? (
                <p className="form-error-msg">{errorMsg.email}</p>
              ) : null}
            </Form.Group>
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
            >
              {isLoading ? <BtnLoadingSpinner /> : "Login"}
            </Button>
          </Form>{" "}
        </div>
      </Layout>
    );
  }
}

export default AdminLogin;
