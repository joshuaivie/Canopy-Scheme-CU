import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateMatricNo } from "utils/validateMatric";
import { UserStorage } from "storage";
import { UserAction, GroupAction } from "actions";
import { successAlert } from "utils/notification";
import GroupMembersContainer from "./GroupMembersContainer";
import EmptyGroupContainer from "./EmptyGroupContainer";
import DeleteGroupModal from "./DeleteGroupModal";
import InviteUserModal from "./InviteUserModal";
import LeaveGroupModal from "./LeaveGroupModal";

const MAX_NO_OF_GROUP_MEMBERS = 5;

class Groups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteeEmail: "",
      inviteeMatricNo: "",
      isLoading: false,
      newGroupName: "",
      groupMembers: [],
      isGroupOwner: false,
      isUserInAnyGroup: false,
      showInviteUserModal: false,
      showLeaveGroupModal: false,
      showDeleteGroupModal: false,
      showCreateGroupModal: false,
      showRemoveGroupMemberModal: {},
      inviteErrorMsg: {},
      createGroupErrorMsg: {}
    };
  }

  componentDidMount() {
    this.setState({ isGroupOwner: this.isUserGroupOwner });
    this.getGroupMembers({ showAllAlerts: false });
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
    if (!validateMatricNo(matric_no))
      return this.setState({
        inviteErrorMsg: { matric_no: "Invalid matric number" },
        isLoading: false
      });

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
    this.setState({ isLoading: true });

    try {
      let { members, owner } = await UserAction.getGroup({ showAllAlerts });
      owner.is_group_owner = true;
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
      this.setState({ isUserInAnyGroup: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
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
        groupMembers,
        isGroupOwner,
        isUserInAnyGroup,
        isLoading,
        showRemoveGroupMemberModal,
        showCreateGroupModal,
        showDeleteGroupModal,
        showLeaveGroupModal,
        showInviteUserModal,
        newGroupName,
        createGroupErrorMsg,
        inviteErrorMsg
      }
    } = this;

    if (isUserInAnyGroup === false) {
      return (
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
    }

    if (isGroupOwner) {
      return (
        <Col xs="12" md="12">
          <Card className="material-card">
            <Card.Header>
              <h5>Group</h5>
              <Button
                variant="outline-danger"
                onClick={() => toggleModal("showDeleteGroupModal")}
              >
                Delete Group
                <FontAwesomeIcon icon="door-open" />
              </Button>
            </Card.Header>

            <Card.Body>
              <p style={{ textAlign: "center" }}>
                Invite your friends to share your joy
              </p>
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
              <div className="group-container-mobile">
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
            </Card.Body>
          </Card>

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
        </Col>
      );
    } else {
      // Not a group admin, hence render all the members of the group user belongs to.

      return (
        <Col xs="12" md="12">
          <Card className="material-card">
            <Card.Header>
              <h5>Group</h5>

              {isGroupOwner ? (
                <div />
              ) : (
                <Button
                  variant="outline-danger"
                  onClick={() => toggleModal("showLeaveGroupModal")}
                >
                  Leave Group
                  <FontAwesomeIcon icon="door-open" />
                </Button>
              )}
            </Card.Header>

            <Card.Body className="not-group-admin">
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
              <div className="group-container-mobile">
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
            </Card.Body>
          </Card>

          <LeaveGroupModal
            isLoading={isLoading}
            toggleModal={toggleModal}
            showLeaveGroupModal={showLeaveGroupModal}
            handleLeaveGroup={handleLeaveGroup}
          />
        </Col>
      );
    }
  }
}

export default Groups;
