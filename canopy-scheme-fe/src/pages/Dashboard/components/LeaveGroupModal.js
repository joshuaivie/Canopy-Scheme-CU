import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function LeaveGroupModal({
  isLoading,
  toggleModal,
  showLeaveGroupModal,
  handleLeaveGroup
}) {
  return (
    <Modal show={showLeaveGroupModal} onHide={() => toggleModal("showLeaveGroupModal")}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to leave this group?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            Leaving this group means you will most likely wouldn't be able to sit down
            with other member(s) of this group during the convocation.
          </p>
          <p>Do you still want to leave this group?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant="light"
          onClick={() => toggleModal("showLeaveGroupModal")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          onClick={handleLeaveGroup}
        >
          {isLoading ? "Loading..." : "Leave Group"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
