import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BtnLoadingSpinner from "components/BtnLoadingSpinner";

export default function InviteUserModal({
  inviteeEmail,
  inviteeMatricNo,
  toggleModal,
  handleInviteUser,
  showInviteUserModal,
  inviteErrorMsg,
  handleChange,
  isLoading
}) {
  return (
    <Modal show={showInviteUserModal} onHide={() => toggleModal("showInviteUserModal")}>
      <Modal.Header closeButton>
        <Modal.Title>Invite a friend to your group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleInviteUser}>
          <Form.Group>
            <Form.Label>Matriculation Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Matriculation Number"
              name="inviteeMatricNo"
              value={inviteeMatricNo}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              This matric number must belong to a user on this platform
            </Form.Text>
            {inviteErrorMsg.matric_no ? (
              <p className="form-error-msg">{inviteErrorMsg.matric_no}</p>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              name="inviteeEmail"
              value={inviteeEmail}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              This email must belong to the same user on this platform
            </Form.Text>
          </Form.Group>
          {inviteErrorMsg.all ? (
            <p className="form-error-msg">{inviteErrorMsg.all}</p>
          ) : null}
          <Button
            type="submit"
            variant="primary"
            className="btn-center"
            disabled={isLoading}
          >
            {isLoading ? <BtnLoadingSpinner /> : "Send Invite"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
