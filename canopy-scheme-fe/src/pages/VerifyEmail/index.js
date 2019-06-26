import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthAction } from "actions";
import Layout from "layouts";
import * as ROUTES from "routes";
import { LoadingSpinner } from "components/spinners";

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
      this.setState({ successMsg: response.msg });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { successMsg, isLoading } = this.state;
    const { toggleModal, history, showAuthModal } = this.props;
    let body;
    if (isLoading) {
      body = <LoadingSpinner height="6rem" width="6rem" />;
    } else if (!isLoading && successMsg) {
      body = (
        <React.Fragment>
          <h2>{successMsg}</h2>
          <p>You can now access all features of canopy scheme</p>
          <Link to={ROUTES.APP}>
            <Button>Dashboard</Button>
          </Link>
        </React.Fragment>
      );
    } else {
      body = (
        <React.Fragment>
          <h2>Error verifying your email</h2>
          <p>Could not verify your email with this verification link.</p>
          <Link to={ROUTES.HOME}>
            <Button>Go home</Button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <Layout toggleModal={toggleModal} history={history} showAuthModal={showAuthModal}>
        <div className="center-large-text-container">{body}</div>
      </Layout>
    );
  }
}

export default VerifyEmail;
