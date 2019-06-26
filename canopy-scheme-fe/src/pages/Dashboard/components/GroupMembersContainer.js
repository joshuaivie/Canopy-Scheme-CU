import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shortenString } from "utils/string";
import { UserStorage } from "storage";
import RemoveGroupMemberModal from "./RemoveGroupMemberModal";
import GroupMemberPlaceholder from "./GroupMemberPlaceholder";

const avatarImg = matricNo =>
  `https://res.cloudinary.com/canopy-scheme/image/upload/ar_1:1,b_rgb:fbf8fb,bo_1px_solid_rgb:ff0000,c_fill,g_face:center,r_max,w_1000/avatar/${matricNo}`;
export default function GroupMembersContainer({
  groupMembers,
  isGroupOwner,
  toggleRemoveGroupMemberModal,
  showRemoveGroupMemberModal,
  handleRemoveMember,
  isLoading,
  toggleModal,
  deleteInvite,
  offline
}) {
  return (
    <React.Fragment>
      {groupMembers.map((groupMember, index) =>
        groupMember !== null ? (
          // eslint-disable-next-line react/no-array-index-key
          <div
            className={`member-card ${!groupMember.joined &&
              !groupMember.is_group_owner &&
              "not-joined"}`}
            key={`member_${index}`}
          >
            <img
              src={avatarImg(groupMember.matric_no)}
              alt={`${groupMember.firstname} ${groupMember.lastname}`}
            />
            <p title={`${groupMember.firstname} ${groupMember.lastname}`}>
              {UserStorage.userInfo.matric_no === groupMember.matric_no
                ? "You"
                : shortenString(`${groupMember.firstname} ${groupMember.lastname}`)}
            </p>
            <p>{groupMember.matric_no}</p>
            {!groupMember.is_group_owner && (
              <Button
                className="remove-button"
                onClick={() =>
                  toggleRemoveGroupMemberModal(
                    groupMember.matric_no,
                    groupMember.joined === 0
                  )
                }
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
                deleteInvite={deleteInvite}
                matricNo={groupMember.matric_no}
                memberName={`${groupMember.firstname} ${groupMember.lastname}`}
                offline={offline}
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
