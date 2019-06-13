import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GroupAction } from "actions";
import Layout from "layouts";
import * as ROUTES from "routes";
import { LoadingSpinner } from "components/spinners";

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
      const { group_id, token, invitee_email, expiring_date } = this.props.match.params;
      const response = await GroupAction.joinGroup({
        groupId: group_id,
        groupToken: token,
        inviteeEmail: invitee_email,
        expiringDate: expiring_date
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
      body = <LoadingSpinner />;
    } else if (!isLoading && successMsg) {
      body = (
        <React.Fragment>
          <h2>{successMsg}</h2>
          <p>Go to your dashboard to see your group members</p>
          <Link to={ROUTES.APP}>
            <Button>Dashboard</Button>
          </Link>
        </React.Fragment>
      );
    } else {
      body = (
        <React.Fragment>
          <h2>Error joining group</h2>
          <p>Could not join group with this invite link</p>
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

export default JoinGroup;
