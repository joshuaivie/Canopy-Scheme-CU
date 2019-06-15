import React from "react";
import { Modal, Button } from "react-bootstrap";
import { NetworkAvailabilityContext } from "utils/http";
import { BtnLoadingSpinner } from "components/spinners";

export default function RemoveGroupMemberModal({
  matricNo,
  memberName,
  isLoading,
  toggleRemoveGroupMemberModal,
  showRemoveGroupMemberModal,
  handleRemoveMember
}) {
  return (
    <NetworkAvailabilityContext.Consumer>
      {context => (
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
              disabled={isLoading || !context.online}
              onClick={() => handleRemoveMember(matricNo)}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Remove"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </NetworkAvailabilityContext.Consumer>
  );
}
