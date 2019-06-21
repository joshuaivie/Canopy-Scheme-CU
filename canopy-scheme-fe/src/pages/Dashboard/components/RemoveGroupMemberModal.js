import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BtnLoadingSpinner } from "components/spinners";

export default function RemoveGroupMemberModal({
  matricNo,
  memberName,
  isLoading,
  toggleRemoveGroupMemberModal,
  showRemoveGroupMemberModal,
  handleRemoveMember,
  deleteInvite,
  offline
}) {
  return (
    <Modal
      show={showRemoveGroupMemberModal[matricNo]}
      onHide={() => toggleRemoveGroupMemberModal(matricNo, deleteInvite)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {deleteInvite
            ? `Cancel Group Invite Sent to ${memberName}`
            : `Remove ${memberName} from your group`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p>
            {deleteInvite
              ? `Cancelling invite sent to ${memberName} means he/she will no longer be able to join your group. This
            reduces his/her chances of sitting with close friends.`
              : `Removing ${memberName} means he/she will no longer be in your group. This
            reduces his/her chances of sitting with close friends.`}
          </p>
          <p>{!deleteInvite && `Do you still want to remove ${memberName}?`}</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          variant="light"
          onClick={() => toggleRemoveGroupMemberModal(matricNo, deleteInvite)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading || offline}
          onClick={() => handleRemoveMember(matricNo, deleteInvite)}
        >
          {isLoading ? <BtnLoadingSpinner /> : "Remove/Cancel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
