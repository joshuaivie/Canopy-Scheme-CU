import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BtnLoadingSpinner } from "components/spinners";

export default function LeaveGroupModal({
  isLoading,
  toggleModal,
  showLeaveGroupModal,
  handleLeaveGroup,
  notJoined,
  offline
}) {
  return (
    <Modal show={showLeaveGroupModal} onHide={() => toggleModal("showLeaveGroupModal")}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to{" "}
          {notJoined ? "cancel this group invitation" : "leave this group?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            {notJoined
              ? "Cancelling this group invitation means you can no longer accept this invitation sent to you by the group owner "
              : "Leaving this group means you will most likely wouldn't be able to sit down with other member(s) of this group during the convocation."}
          </p>
          <p>Do you still want to?</p>
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
          disabled={isLoading || offline}
          onClick={handleLeaveGroup}
        >
          {isLoading ? <BtnLoadingSpinner /> : "Leave/Cancel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
