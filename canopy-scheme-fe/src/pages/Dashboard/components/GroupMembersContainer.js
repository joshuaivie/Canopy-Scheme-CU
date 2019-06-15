import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shortenString } from "utils/string";
import RemoveGroupMemberModal from "./RemoveGroupMemberModal";
import GroupMemberPlaceholder from "./GroupMemberPlaceholder";

const avatarImg = matric_no =>
  `https://res.cloudinary.com/canopy-scheme/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_0px_solid_red,b_rgb:fbf8fb/v1560465313/avatar/${matric_no.toUpperCase()}.jpg`;
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
              src={avatarImg(groupMember.matric_no)}
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
