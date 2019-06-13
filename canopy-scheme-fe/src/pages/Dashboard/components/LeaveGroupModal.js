import React from "react";
import { Modal, Button } from "react-bootstrap";
import { NetworkAvailabilityContext } from "utils/http";
import { BtnLoadingSpinner } from "components/spinners";

export default function LeaveGroupModal({
  isLoading,
  toggleModal,
  showLeaveGroupModal,
  handleLeaveGroup
}) {
  return (
    <NetworkAvailabilityContext.Consumer>
      {context => (
        <Modal
          show={showLeaveGroupModal}
          onHide={() => toggleModal("showLeaveGroupModal")}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to leave this group?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                Leaving this group means you will most likely wouldn't be able to sit
                down with other member(s) of this group during the convocation.
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
              disabled={isLoading || !context.online}
              onClick={handleLeaveGroup}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Leave Group"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      /
    </NetworkAvailabilityContext.Consumer>
  );
}
