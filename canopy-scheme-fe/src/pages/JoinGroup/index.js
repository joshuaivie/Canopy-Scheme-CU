import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GroupAction } from "actions";
import Layout from "layouts";
import * as ROUTES from "routes";

class JoinGroup extends React.Component {
  state = {
    isLoading: false,
    successMsg: ""
  };

  componentDidMount() {
    this.joinGroup();
  }

  async joinGroup() {
    this.setState({ isLoading: true });
    try {
      const { group_id, token, invitee_email } = this.props.match.params;
      const response = await GroupAction.joinGroup({
        groupId: group_id,
        groupToken: token,
        inviteeEmail: invitee_email
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
              <p>Go to your dashboard to see your group members</p>
              <Link to={ROUTES.APP}>
                <Button>Dashboard</Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Error joining group</h2>
              <p>Could not join group with this invite link</p>
            </React.Fragment>
          )}
        </div>
      </Layout>
    );
  }
}

export default JoinGroup;
