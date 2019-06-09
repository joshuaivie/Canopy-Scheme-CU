import React from "react";
import { Container, Row } from "react-bootstrap";
import Groups from "pages/Dashboard/components/Group";
import Payments from "pages/Dashboard/components/Payments";
import { UserStorage } from "storage";
import { UserAction } from "actions";
import { successAlert } from "utils/notification";
import Avatar from "./components/Avatar";
import ChangePasswordModal from "./components/ChangePasswordModal";

export const ResendVerificationEmailContext = React.createContext({
  verificationEmailSent: false,
  resendVerificationEmailIsLoading: false,
  resendEmailVerificationLink: () => {}
});

class Dashboard extends React.Component {
  state = {
    showChangePasswordModal: false,
    verificationEmailSent: false,
    resendVerificationEmailIsLoading: false
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
    const { userInfo } = UserStorage;
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
            Welcome, {` ${userInfo.firstname} ${userInfo.lastname}`}
          </h4>
          <Avatar
            history={history}
            toggleChangePasswordModal={() =>
              this.toggleModal("showChangePasswordModal")
            }
          />
        </div>
        <Container>
          <Row>
            <ResendVerificationEmailContext.Provider
              value={{
                verificationEmailSent,
                resendVerificationEmailIsLoading,
                resendEmailVerificationLink
              }}
            >
              <Payments />
              <Groups />
            </ResendVerificationEmailContext.Provider>
          </Row>
        </Container>
        <ChangePasswordModal
          toggleModal={() => this.toggleModal("showChangePasswordModal")}
          showChangePasswordModal={showChangePasswordModal}
        />
      </div>
    );
  }
}

export default Dashboard;
