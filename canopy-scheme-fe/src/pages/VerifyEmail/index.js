import React from "react";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthAction } from "actions";
import Layout from "layouts";
import * as ROUTES from "routes";

class VerifyEmail extends React.Component {
  state = {
    isLoading: false,
    errorMsg: "",
    successMsg: ""
  };

  componentDidMount() {
    this.verifyEmail();
  }

  async verifyEmail() {
    this.setState({ isLoading: true });
    try {
      const { token } = this.props.match.params;
      const response = await AuthAction.verifyEmail({
        emailToken: token
      });
      this.setState({ isLoading: false, successMsg: response.msg });
    } catch (errorMsg) {
      console.log(errorMsg);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { successMsg, isLoading } = this.state;
    const { toggleModal, history, showAuthModal } = this.props;
    return (
      <Layout toggleModal={toggleModal} history={history} showAuthModal={showAuthModal}>
        <div className="center-large-text-container">
          {isLoading ? (
            <Spinner animation="border" style={{ height: "6rem", width: "6rem" }} />
          ) : null}
          {successMsg ? (
            <React.Fragment>
              <h2>{successMsg}</h2>
              <p>You can now access all features of canopy scheme</p>
              <Link to="/app">
                <Button>Dashboard</Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Error verifying your email</h2>
              <p>Could not verify your email with this verification link.</p>
              <Link to={ROUTES.HOME}>
                <Button>Go home</Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </Layout>
    );
  }
}

export default VerifyEmail;
