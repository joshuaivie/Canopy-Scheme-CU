import React from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <div key={"member_" + index}>
            <Card className="member-card" key={"member_" + index}>
              <Card.Img />
              <Card.Title>
                {groupMember.firstname} {groupMember.lastname}{" "}
                {groupMember.is_group_owner ? "(Owner)" : ""}
              </Card.Title>
              <Card.Text>{groupMember.matric_no}</Card.Text>
              {!groupMember.is_group_owner && isGroupOwner ? (
                <Button
                  className="remove-button"
                  onClick={() => toggleRemoveGroupMemberModal(groupMember.matric_no)}
                >
                  <FontAwesomeIcon icon="minus" />
                </Button>
              ) : null}
            </Card>

            {!groupMember.is_group_owner && isGroupOwner ? (
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
