import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { AuthAction } from "actions";
import Layout from "layouts";
import { successAlert } from "utils/notification";
import * as ROUTES from "routes";

class ResetPassword extends React.Component {
  state = {
    password: "",
    passwordConfirm: "",
    isLoading: false,
    errorMsg: {}
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ isLoading: true, errorMsg: {} });
    this.requestPassword();
    event.preventDefault();
  };

  async requestPassword() {
    try {
      const { token } = this.props.match.params;
      const { password, passwordConfirm } = this.state;
      const response = await AuthAction.resetPassword({
        password,
        passwordConfirm,
        passwordToken: token
      });
      successAlert(response.msg);
      const {
        history: { push }
      } = this.props;
      window.setTimeout(function() {
        push(ROUTES.HOME);
      }, 2000);
    } catch (errorMsg) {
      this.setState({ errorMsg });
    } finally {
      this.setState({ isLoading: false, password: "", passwordConfirm: "" });
    }
  }

  render() {
    const { password, passwordConfirm, errorMsg, isLoading } = this.state;
    const { toggleModal, history, showAuthModal } = this.props;
    return (
      <Layout toggleModal={toggleModal} history={history} showAuthModal={showAuthModal}>
        <div id="reset-pasword-form">
          <h3 className="primary-text">Reset your password</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
              {errorMsg.password ? (
                <p className="form-error-msg">{errorMsg.password}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.handleChange}
                required
              />
              {errorMsg.password_confirm ? (
                <p className="form-error-msg">{errorMsg.password_confirm}</p>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" /> : "Reset Password"}
            </Button>
          </Form>{" "}
        </div>
      </Layout>
    );
  }
}

export default ResetPassword;
