import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatarImg from "assets/img/portrait.png";
import { shortenString } from "utils/string";
import RemoveGroupMemberModal from "./RemoveGroupMemberModal";
import GroupMemberPlaceholder from "./GroupMemberPlaceholder";

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
          // eslint-disable-next-line react/no-array-index-key
          <div className="member-card" key={`member_${index}`}>
            <img
              src={avatarImg}
              alt={`${groupMember.firstname} ${groupMember.lastname}`}
            />
            <p title={`${groupMember.firstname} ${groupMember.lastname}`}>
              {shortenString(`${groupMember.firstname} ${groupMember.lastname}`)}
            </p>
            <p>{groupMember.matric_no}</p>
            {!groupMember.is_group_owner && (
              <Button
                className="remove-button"
                onClick={() => toggleRemoveGroupMemberModal(groupMember.matric_no)}
              >
                <FontAwesomeIcon icon="minus" />
              </Button>
            )}
            {groupMember.is_group_owner && (
              <div className="group-owner bg-success" title="Group Owner">
                <FontAwesomeIcon icon="user-circle" />
              </div>
            )}
            {!groupMember.is_group_owner && (
              <RemoveGroupMemberModal
                isLoading={isLoading}
                handleRemoveMember={handleRemoveMember}
                toggleRemoveGroupMemberModal={toggleRemoveGroupMemberModal}
                showRemoveGroupMemberModal={showRemoveGroupMemberModal}
                matricNo={groupMember.matric_no}
                memberName={`${groupMember.firstname} ${groupMember.lastname}`}
              />
            )}
          </div>
        ) : (
          <GroupMemberPlaceholder
            // eslint-disable-next-line react/no-array-index-key
            key={`member_${index}`}
            enabled={isGroupOwner}
            toggleModal={toggleModal}
          />
        )
      )}
    </React.Fragment>
  );
}
