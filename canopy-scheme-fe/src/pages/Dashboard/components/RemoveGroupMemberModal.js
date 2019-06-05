import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

export default function RemoveGroupMemberModal({
  matricNo,
  memberName,
  isLoading,
  toggleRemoveGroupMemberModal,
  showRemoveGroupMemberModal,
  handleRemoveMember
}) {
  return (
    <Modal
      show={showRemoveGroupMemberModal[matricNo]}
      onHide={() => toggleRemoveGroupMemberModal(matricNo)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Remove {memberName} from your group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p>
            Removing {memberName} means he/she will no longer be in your group. This
            reduces his/her chances of sitting with close friends.
          </p>
          <p>Do you still want to remove {memberName}?</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          variant="light"
          onClick={() => toggleRemoveGroupMemberModal(matricNo)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          onClick={() => handleRemoveMember(matricNo)}
        >
          {isLoading ? <Spinner animation="border" /> : "Remove"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
