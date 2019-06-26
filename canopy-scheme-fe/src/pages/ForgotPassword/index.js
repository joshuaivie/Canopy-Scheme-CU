import React from "react";
import { Form, Button } from "react-bootstrap";
import { AuthAction } from "actions";
import Layout from "layouts";
import { successAlert } from "utils/notification";
import { BtnLoadingSpinner } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

class ForgotPassword extends React.Component {
  state = {
    email: "",
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
    this.requestChangePassword();
    event.preventDefault();
  };

  async requestChangePassword() {
    try {
      const { email } = this.state;
      const response = await AuthAction.requestChangePassword({ email });
      successAlert(response.msg);
      this.setState({ isLoading: false, email: "" });
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }

  render() {
    const { email, errorMsg, isLoading } = this.state;
    const { toggleModal, history, showAuthModal } = this.props;
    return (
      <Layout toggleModal={toggleModal} history={history} showAuthModal={showAuthModal}>
        <div id="forgot-pasword-form">
          <h3 className="primary-text">Forgot your password?</h3>
          <p>
            Type in the email you registered your account with, we'll send you a pasword
            reset link.
          </p>
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
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || this.context.offline}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Reset Password"}
            </Button>
          </Form>{" "}
        </div>
      </Layout>
    );
  }
}

export default ForgotPassword;
