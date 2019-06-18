import React from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserStorage } from "storage";
import { UserAction, GroupAction } from "actions";
import { successAlert } from "utils/notification";
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

const MAX_NO_OF_GROUP_MEMBERS = 5;

class Groups extends React.Component {
  state = {
    inviteeEmail: "",
    inviteeMatricNo: "",
    isLoading: false,
    isFetching: false,
    errorFetching: false,
    newGroupName: "",
    groupName: "",
    groupMembers: [],
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

    this.setState({
      isGroupOwner: this.isUserGroupOwner
    });

    if (email_verified && paid_for_table) {
      this.getGroupMembers({ showAllAlerts: false });
    }
  }

  toggleRemoveGroupMemberModal = matricNo => {
    const { showRemoveGroupMemberModal } = this.state;
    showRemoveGroupMemberModal[matricNo] = !showRemoveGroupMemberModal[matricNo];
    this.setState({ showRemoveGroupMemberModal });
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
      this.setState({
        inviteeMatricNo: "",
        inviteeEmail: "",
        showInviteUserModal: false,
        inviteErrorMsg: {}
      });
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.failed[0]["msg"];
        this.setState({ inviteErrorMsg: { all: msg } });
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
        showLeaveGroupModal: false
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  /**
   * Sets the state of the group members. It fills in remaining members
   * slot left with null if total members is less than the
   * MAX_NO_OF_GROUP_MEMBERS allowed.
   */
  populateGroupMembers = members => {
    while (members.length < MAX_NO_OF_GROUP_MEMBERS) members.push(null);
    this.setState({ groupMembers: members });
  };

  handleCreateGroup = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { newGroupName: name } = this.state;

    try {
      const { msg } = await GroupAction.createGroup({ name });
      successAlert(msg);
      this.isUserGroupOwner = true; // updates in state and localstorage.
      this.populateGroupMembers([UserStorage.userInfo]);
      this.setState({
        newGroupName: "",
        groupName: name,
        isUserInAnyGroup: true,
        showCreateGroupModal: false,
        createGroupErrorMsg: {}
      });
    } catch (err) {
      // stop showing "Error", only show "name"
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
        isUserInAnyGroup: false,
        showDeleteGroupModal: false
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleRemoveMember = async matricNo => {
    this.setState({ isLoading: true });
    try {
      const { msg } = await UserAction.removeMember({ matricNo });
      successAlert(msg);
    } finally {
      let { showRemoveGroupMemberModal, groupMembers } = this.state;
      groupMembers = groupMembers.map(member => {
        if (member && member.matric_no !== matricNo) return member;
        return null;
      });
      showRemoveGroupMemberModal[matricNo] = false;
      this.setState({ isLoading: false, showRemoveGroupMemberModal, groupMembers });
    }
  };

  getGroupMembers = async ({ showAllAlerts }) => {
    this.setState({ errorFetching: false, isFetching: true });
    try {
      let { members, owner, name } = await UserAction.getGroup({ showAllAlerts });
      owner.is_group_owner = true;
      this.setState({ groupName: name });
      const showRemoveGroupMemberModal = {};
      members = members.map(m => {
        let user = m.user;
        user.is_group_owner = false;
        showRemoveGroupMemberModal[user.matric_no] = false;
        return user;
      });
      this.populateGroupMembers([owner, ...members]);
      this.setState({ isUserInAnyGroup: true, showRemoveGroupMemberModal });
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
      userInfo: { email_verified, paid_for_table }
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
        showLeaveGroupModal,
        showInviteUserModal,
        showHelpModal,
        newGroupName,
        createGroupErrorMsg,
        inviteErrorMsg
      }
    } = this;
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
                groupMembers={groupMembers}
                isGroupOwner={isGroupOwner}
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
            />

            <DeleteGroupModal
              showDeleteGroupModal={showDeleteGroupModal}
              toggleModal={toggleModal}
              isLoading={isLoading}
              handleDeleteGroup={handleDeleteGroup}
            />
          </React.Fragment>
        );
      } else if (isUserInAnyGroup === true && !isGroupOwner) {
        // Not a group admin, hence render all the members of the group user belongs to.
        body = (
          <React.Fragment>
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
            />
          </React.Fragment>
        );
      }
    }

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>
              {groupName !== "" ? groupName : "Group"} &nbsp;
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
                    disabled={errorFetching || !this.context.online}
                    variant="outline-danger"
                    onClick={() => toggleModal("showDeleteGroupModal")}
                  >
                    <FontAwesomeIcon icon="door-open" />
                    &nbsp;Delete
                  </Button>
                )}
                {isUserInAnyGroup && !isGroupOwner && (
                  <Button
                    disabled={errorFetching || !this.context.online}
                    variant="outline-danger"
                    onClick={() => toggleModal("showLeaveGroupModal")}
                  >
                    <FontAwesomeIcon icon="door-open" />
                    &nbsp;Leave
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
                  style={{ float: "right" }}
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
