import React from "react";
import { Container } from "react-bootstrap";
import Groups from "pages/Dashboard/components/Group";
import Payments from "pages/Dashboard/components/Payments";
import { UserStorage } from "storage";
import { UserAction } from "actions";
import { successAlert } from "utils/notification";
import Avatar from "./components/Avatar";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { Redirect } from "react-router-dom";
import * as ROUTES from "routes";
import { LoadingSpinner, RetryBtn } from "components/spinners";
import Typewriter from "typewriter-effect";

export const ResendVerificationEmailContext = React.createContext({
  verificationEmailSent: false,
  resendVerificationEmailIsLoading: false,
  resendEmailVerificationLink: () => {}
});

class Dashboard extends React.Component {
  state = {
    showChangePasswordModal: false,
    verificationEmailSent: false,
    resendVerificationEmailIsLoading: false,
    isFetching: false,
    errorFetching: false
  };

  componentDidMount() {
    if (UserStorage.userInfo) this.getProfile();
  }

  getProfile = async () => {
    this.setState({ isFetching: true, errorFetching: false });
    try {
      await UserAction.getProfile();
    } catch (err) {
      console.log(err);
      this.setState({ errorFetching: true });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  resendEmailVerificationLink = async () => {
    this.setState({ isLoading: true });
    try {
      const { msg } = await UserAction.resendEmailVerificationLink();
      successAlert(msg);
      this.setState({
        verificationEmailSent: true,
        resendVerificationEmailIsLoading: false
      });
    } catch (err) {
      this.setState({ resendVerificationEmailIsLoading: false });
      console.log(err);
    }
  };

  toggleModal = modal => {
    const { [modal]: showModal } = this.state;
    this.setState({ [modal]: !showModal });
  };

  render() {
    const { isFetching, errorFetching } = this.state;
    if (isFetching && !errorFetching) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh"
          }}
        >
          <LoadingSpinner width="6rem" height="6rem" />;
        </div>
      );
    } else if (errorFetching && !isFetching) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh"
          }}
        >
          <RetryBtn retryEvent={this.getProfile} width="6rem" height="6rem" />
        </div>
      );
    } else {
      const { userInfo } = UserStorage;
      if (!userInfo) {
        return (
          <Redirect
            to={{
              pathname: ROUTES.ADMIN,
              state: { from: this.props.location, isRedirect: true }
            }}
          />
        );
      }
      const { history } = this.props;
      const {
        showChangePasswordModal,
        verificationEmailSent,
        resendVerificationEmailIsLoading
      } = this.state;

      const { resendEmailVerificationLink } = this;

      return (
        <div className="dashboard">
          <div className="dashboard-header">
            <h4 className="welcome-text">
              <Typewriter
                options={{
                  strings: ["Welcome", "Kaabo", "Nnabata", "Maraba", "欢迎", "😁 👋 "],
                  autoStart: true,
                  loop: true
                }}
              />
              <span>, {` ${userInfo.firstname} ${userInfo.lastname}`}</span>
            </h4>
            <Avatar
              history={history}
              toggleChangePasswordModal={() =>
                this.toggleModal("showChangePasswordModal")
              }
            />
          </div>
          <ResendVerificationEmailContext.Provider
            value={{
              verificationEmailSent,
              resendVerificationEmailIsLoading,
              resendEmailVerificationLink
            }}
          >
            <Container>
              <Payments paymentType="offline" />
              <Groups />
            </Container>
          </ResendVerificationEmailContext.Provider>
          <ChangePasswordModal
            toggleModal={() => this.toggleModal("showChangePasswordModal")}
            showChangePasswordModal={showChangePasswordModal}
          />
        </div>
      );
    }
  }
}

export default Dashboard;
