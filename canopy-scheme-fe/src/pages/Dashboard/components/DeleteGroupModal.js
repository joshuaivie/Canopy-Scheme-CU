import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteGroupModal({
  showDeleteGroupModal,
  toggleModal,
  isLoading,
  handleDeleteGroup
}) {
  return (
    <Modal
      show={showDeleteGroupModal}
      onHide={() => toggleModal("showDeleteGroupModal")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete your group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p>
            Deleting this group means all members of this group will no longer be in any
            group. This reduces your chances of sitting with close friends.
          </p>
          <p>Do you still want to delete this group?</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          variant="light"
          onClick={() => toggleModal("showDeleteGroupModal")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          onClick={handleDeleteGroup}
        >
          {isLoading ? "Loading..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
