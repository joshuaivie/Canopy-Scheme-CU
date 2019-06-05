import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveGroupMemberModal from "./RemoveGroupMemberModal";
import GroupMemberPlaceholder from "./GroupMemberPlaceholder";
import avatarImg from "assets/img/portrait.png";
import { shortenString } from "utils/string";

export default function GroupMembersContainer({
  groupMembers,
  isGroupOwner,
  toggleRemoveGroupMemberModal,
  showRemoveGroupMemberModal,
  handleRemoveMember,
  isLoading,
  toggleModal
}) {
  return (
    <React.Fragment>
      {groupMembers.map((groupMember, index) =>
        groupMember !== null ? (
          <div className="member-card" key={"member_" + index}>
            <img
              src={avatarImg}
              alt={`${groupMember.firstname} ${groupMember.lastname}`}
            />
            <p title={`${groupMember.firstname} ${groupMember.lastname}`}>
              {shortenString(`${groupMember.firstname} ${groupMember.lastname}`)}
              {/* {groupMember.is_group_owner ? "(Owner)" : null} */}
            </p>
            <p>{groupMember.matric_no}</p>
            {!groupMember.is_group_owner ? (
              <Button
                className="remove-button"
                onClick={() => toggleRemoveGroupMemberModal(groupMember.matric_no)}
              >
                <FontAwesomeIcon icon="minus" />
              </Button>
            ) : null}
            {!groupMember.is_group_owner ? (
              <RemoveGroupMemberModal
                isLoading={isLoading}
                handleRemoveMember={handleRemoveMember}
                toggleRemoveGroupMemberModal={toggleRemoveGroupMemberModal}
                showRemoveGroupMemberModal={showRemoveGroupMemberModal}
                matricNo={groupMember.matric_no}
                memberName={`${groupMember.firstname} ${groupMember.lastname}`}
              />
            ) : null}
          </div>
        ) : (
          <GroupMemberPlaceholder
            key={"member_" + index}
            enabled={isGroupOwner}
            toggleModal={toggleModal}
          />
        )
      )}
    </React.Fragment>
  );
}
