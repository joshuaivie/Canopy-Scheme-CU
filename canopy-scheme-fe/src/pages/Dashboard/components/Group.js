import React from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserStorage } from "storage";
import { UserAction, GroupAction } from "actions";
import { successAlert } from "utils/notification";
import { shortenString } from "utils/string";
import GroupMembersContainer from "./GroupMembersContainer";
import EmptyGroupContainer from "./EmptyGroupContainer";
import DeleteGroupModal from "./DeleteGroupModal";
import InviteUserModal from "./InviteUserModal";
import LeaveGroupModal from "./LeaveGroupModal";
import GroupHelpModal from "./GroupHelpModal";
import FeatureLock from "components/FeatureLock";
import GroupLock from "components/GroupLock";
import { LoadingSpinner, RetryBtn } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

class Groups extends React.Component {
  state = {
    inviteeEmail: "",
    inviteeMatricNo: "",
    isLoading: false,
    isFetching: true,
    errorFetching: false,
    newGroupName: "",
    groupName: "",
    groupMembers: [],
    deleteInvite: false,
    isGroupOwner: false,
    isUserInAnyGroup: false,
    showInviteUserModal: false,
    showLeaveGroupModal: false,
    showDeleteGroupModal: false,
    showCreateGroupModal: false,
    showHelpModal: false,
    showRemoveGroupMemberModal: {},
    inviteErrorMsg: {},
    createGroupErrorMsg: {}
  };

  static contextType = NetworkAvailabilityContext;

  componentDidMount() {
    const {
      userInfo: { email_verified, paid_for_table }
    } = UserStorage;

    if (email_verified && paid_for_table) {
      this.getGroupMembers({ showAllAlerts: false });
    }
  }

  toggleRemoveGroupMemberModal = (matricNo, deleteInvite) => {
    const { showRemoveGroupMemberModal } = this.state;
    showRemoveGroupMemberModal[matricNo] = !showRemoveGroupMemberModal[matricNo];
    this.setState({ showRemoveGroupMemberModal, deleteInvite });
  };

  toggleModal = state => {
    const { [state]: visibility } = this.state;
    this.setState({ [state]: !visibility });
  };

  /**
   * Is the currently logged in user is a group owner (updates value
   * in localstorage on change).
   */
  get isUserGroupOwner() {
    const user = UserStorage.userInfo;
    if (user == null) return false;
    return user.is_group_owner === true || user.is_group_owner === 1;
  }

  /**
   * Sets if the currently logged in user is a group owner.
   */
  set isUserGroupOwner(value) {
    UserStorage.updateUserInfo({ is_group_owner: Boolean(value) });
    this.setState({ isGroupOwner: Boolean(value) });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInviteUser = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { inviteeMatricNo: matric_no, inviteeEmail: email } = this.state;

    try {
      const { msg } = await GroupAction.inviteUser({ users: [{ matric_no, email }] });
      successAlert(msg);
      let { groupMembers } = this.state;
      // remove one null item of the list and replace it with new invitee
      groupMembers.pop();
      groupMembers.push({
        matric_no,
        email,
        firstname: "New",
        lastname: "Invitee",
        is_group_owner: false,
        joined: 0
      });
      groupMembers.sort();
      this.setState({
        inviteeMatricNo: "",
        inviteeEmail: "",
        showInviteUserModal: false,
        inviteErrorMsg: {},
        groupMembers
      });
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        if (data.failed) {
          const msg = err.response.data.failed[0]["msg"];
          this.setState({ inviteErrorMsg: { all: msg } });
        }
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLeaveGroup = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const { msg } = await UserAction.leaveGroup();
      successAlert(msg);
      this.isUserGroupOwner = false; // updates in state and localstorage.
      this.setState({
        groupMembers: [],
        isUserInAnyGroup: false,
        showLeaveGroupModal: false,
        groupName: ""
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCreateGroup = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { newGroupName: name } = this.state;

    try {
      const { msg } = await GroupAction.createGroup({ name });
      successAlert(msg);
      this.isUserGroupOwner = true; // updates in state and localstorage.
      const groupMembers = [UserStorage.userInfo];
      while (groupMembers.length <= 4) groupMembers.push(null);
      this.setState({
        newGroupName: "",
        groupName: name,
        isUserInAnyGroup: true,
        showCreateGroupModal: false,
        createGroupErrorMsg: {},
        groupMembers
      });
    } catch (err) {
      this.setState({ createGroupErrorMsg: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDeleteGroup = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const { msg } = await UserAction.deleteGroup();
      successAlert(msg);
      this.isUserGroupOwner = false; // updates in state and localstorage.
      this.setState({
        groupMembers: [],
        isGroupOwner: false,
        groupName: "",
        isUserInAnyGroup: false,
        showDeleteGroupModal: false
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleRemoveMember = async (matricNo, deleteInvite) => {
    this.setState({ isLoading: true });
    try {
      const { msg } = await UserAction.removeMember({ matricNo, deleteInvite });
      successAlert(msg);
      let { groupMembers } = this.state;
      groupMembers = groupMembers
        .map(member => {
          if (member && member.matric_no !== matricNo) return member;
          return null;
        })
        .sort();
      this.setState({ groupMembers });
    } finally {
      let { showRemoveGroupMemberModal } = this.state;
      showRemoveGroupMemberModal[matricNo] = false;
      this.setState({ isLoading: false, showRemoveGroupMemberModal });
    }
  };

  getGroupMembers = async ({ showAllAlerts }) => {
    this.setState({
      errorFetching: false,
      isFetching: true,
      isGroupOwner: this.isUserGroupOwner
    });
    try {
      let { members, owner, name, maximum_group_members } = await UserAction.getGroup({
        showAllAlerts
      });
      owner.is_group_owner = true;
      const showRemoveGroupMemberModal = {};
      members = members.map(m => {
        let user = m.user;
        user.is_group_owner = false;
        user.joined = m.joined;
        showRemoveGroupMemberModal[user.matric_no] = false;
        return user;
      });
      /**
       * Sets the state of the group members. It fills in remaining members
       * slot left with null if total members is less than the
       * maximum_group_members allowed.
       */
      members = [owner, ...members];
      while (members.length <= maximum_group_members) members.push(null);
      this.setState({
        isUserInAnyGroup: true,
        showRemoveGroupMemberModal,
        groupName: name,
        groupMembers: members
      });
    } catch (err) {
      let errorFetching = false;
      if (err.request && err.request.status === 0) errorFetching = true;
      this.setState({ isUserInAnyGroup: false, errorFetching });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  render() {
    const {
      userInfo: { email_verified, paid_for_table, matric_no: userMatricNo }
    } = UserStorage;
    const {
      handleDeleteGroup,
      handleCreateGroup,
      handleRemoveMember,
      handleLeaveGroup,
      toggleRemoveGroupMemberModal,
      handleInviteUser,
      handleChange,
      toggleModal,
      state: {
        inviteeEmail,
        inviteeMatricNo,
        groupName,
        groupMembers,
        isGroupOwner,
        isUserInAnyGroup,
        isLoading,
        isFetching,
        errorFetching,
        showRemoveGroupMemberModal,
        showCreateGroupModal,
        showDeleteGroupModal,
        deleteInvite,
        showLeaveGroupModal,
        showInviteUserModal,
        showHelpModal,
        newGroupName,
        createGroupErrorMsg,
        inviteErrorMsg
      },
      context: { offline }
    } = this;
    let notJoined = false;
    let body = null;
    if (!email_verified) {
      body = <FeatureLock />;
    } else if (!paid_for_table) {
      body = <GroupLock />;
    } else if (isFetching === true) {
      body = <LoadingSpinner />;
    } else if (errorFetching === true) {
      body = (
        <RetryBtn
          retryEvent={this.getGroupMembers}
          retryEventParams={{ showAllAlerts: false }}
        />
      );
    } else {
      if (!isGroupOwner && !isUserInAnyGroup) {
        body = (
          <EmptyGroupContainer
            handleCreateGroup={handleCreateGroup}
            isLoading={isLoading}
            createGroupErrorMsg={createGroupErrorMsg}
            showCreateGroupModal={showCreateGroupModal}
            newGroupName={newGroupName}
            handleChange={handleChange}
            toggleModal={toggleModal}
            offline={offline}
          />
        );
      } else if (isGroupOwner) {
        body = (
          <React.Fragment>
            <p style={{ textAlign: "center" }}>Invite your friends to share your joy</p>
            <div className="group-container">
              <GroupMembersContainer
                showRemoveGroupMemberModal={showRemoveGroupMemberModal}
                isLoading={isLoading}
                handleRemoveMember={handleRemoveMember}
                toggleModal={toggleModal}
                toggleRemoveGroupMemberModal={toggleRemoveGroupMemberModal}
                deleteInvite={deleteInvite}
                groupMembers={groupMembers}
                isGroupOwner={isGroupOwner}
                offline={offline}
              />
            </div>

            <InviteUserModal
              toggleModal={toggleModal}
              handleInviteUser={handleInviteUser}
              showInviteUserModal={showInviteUserModal}
              inviteErrorMsg={inviteErrorMsg}
              handleChange={handleChange}
              isLoading={isLoading}
              inviteeEmail={inviteeEmail}
              inviteeMatricNo={inviteeMatricNo}
              offline={offline}
            />

            <DeleteGroupModal
              showDeleteGroupModal={showDeleteGroupModal}
              toggleModal={toggleModal}
              isLoading={isLoading}
              handleDeleteGroup={handleDeleteGroup}
              offline={offline}
            />
          </React.Fragment>
        );
      } else if (isUserInAnyGroup === true && !isGroupOwner) {
        // Not a group admin, hence render all the members of the group user belongs to.
        let namesNotJoined = "";
        groupMembers.map(x => {
          if (x && x.joined === 0 && x.matric_no === userMatricNo) notJoined = true;
          if (x && x.joined === 0 && x.matric_no !== userMatricNo)
            namesNotJoined += `${x.firstname} ${x.lastname}, `;
          return x;
        });
        body = (
          <React.Fragment>
            {notJoined && (
              <p style={{ textAlign: "center" }}>
                You are yet to accept the invitation to this group. Check your email for
                the invitation link.
              </p>
            )}
            {namesNotJoined !== "" && (
              <p style={{ textAlign: "center" }}>
                {`${namesNotJoined} is/are yet to accept the invitation to this group`}
              </p>
            )}
            <div className="group-container not-group-admin">
              <GroupMembersContainer
                showRemoveGroupMemberModal={showRemoveGroupMemberModal}
                isLoading={isLoading}
                handleRemoveMember={handleRemoveMember}
                toggleModal={toggleModal}
                toggleRemoveGroupMemberModal={toggleRemoveGroupMemberModal}
                groupMembers={groupMembers}
                isGroupOwner={isGroupOwner}
              />
            </div>
            <LeaveGroupModal
              isLoading={isLoading}
              toggleModal={toggleModal}
              showLeaveGroupModal={showLeaveGroupModal}
              handleLeaveGroup={handleLeaveGroup}
              notJoined={notJoined}
              offline={offline}
            />
          </React.Fragment>
        );
      }
    }

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5 title={groupName !== "" ? groupName : null}>
              {groupName !== "" ? " Group: " + shortenString(groupName, 10) : "Group"}{" "}
              &nbsp;
              <FontAwesomeIcon
                icon="question-circle"
                title="Know more about groups"
                style={{
                  cursor: "pointer"
                }}
                onClick={() => toggleModal("showHelpModal")}
              />
            </h5>
            {email_verified && paid_for_table ? (
              <React.Fragment>
                {isGroupOwner && (
                  <Button
                    disabled={errorFetching || offline}
                    variant="outline-danger"
                    onClick={() => toggleModal("showDeleteGroupModal")}
                  >
                    <FontAwesomeIcon icon="door-open" />
                    &nbsp;Delete
                  </Button>
                )}
                {isUserInAnyGroup && !isGroupOwner && (
                  <Button
                    disabled={errorFetching || offline}
                    variant="outline-danger"
                    onClick={() => toggleModal("showLeaveGroupModal")}
                  >
                    <FontAwesomeIcon icon="door-open" />
                    &nbsp; {notJoined ? "Cancel Invite" : "Leave"}
                  </Button>
                )}
              </React.Fragment>
            ) : null}
          </Card.Header>
          <Card.Body>{body}</Card.Body>
          <Accordion className="my-5">
            <Accordion.Toggle as={Card.Header} className="accordion-card" eventKey="0">
              <h5 style={{ width: "100%" }}>
                *Special Request &nbsp;{" "}
                <FontAwesomeIcon
                  className="text-right"
                  style={{ float: "right", cursor: "pointer" }}
                  icon="chevron-circle-down"
                />
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  <Row>
                    <Col xs="12" md="12">
                      <p className="py-3">
                        If you are interested in setting up a larger group with your
                        friends, course mates or department, kindly send a mail to{" "}
                        <a
                          href="mailto:cpc@covenantuniversity.edu.ng"
                          style={{ color: "purple" }}
                        >
                          cpc@covenantuniversity.edu.ng
                        </a>{" "}
                        providing the following details:
                      </p>
                      <ol className="ol">
                        <li className="my-3">
                          Your group name (
                          {groupName === "" ? "Create a group" : groupName})
                        </li>
                        <li className="my-3">The reason for the expansion</li>
                        <li className="my-3">The amount of people under your group</li>
                        <li className="my-3">Your contact information</li>
                      </ol>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Accordion>
        </Card>
        <GroupHelpModal showHelpModal={showHelpModal} toggleModal={toggleModal} />
      </Col>
    );
  }
}

export default Groups;
