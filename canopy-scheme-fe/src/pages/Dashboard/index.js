import React from "react";
import { Container, Row } from "react-bootstrap";
import Groups from "pages/Dashboard/components/Group";
import Payments from "pages/Dashboard/components/Payments";
import { UserStorage } from "storage";
import Avatar from "./components/Avatar";
import ChangePasswordModal from "./components/ChangePasswordModal";

class Dashboard extends React.Component {
  state = {
    showChangePasswordModal: false
  };

  toggleModal = modal => {
    const { [modal]: showModal } = this.state;
    this.setState({ [modal]: !showModal });
  };

  render() {
    const { userInfo } = UserStorage;
    const { history } = this.props;
    const { showChangePasswordModal } = this.state;
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
            <Payments />
            <Groups />
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
