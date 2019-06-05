import React from "react";
import { Form, Button, Card, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmptyGroupContainer({
  toggleModal,
  showCreateGroupModal,
  isLoading,
  createGroupErrorMsg,
  handleCreateGroup,
  handleChange,
  newGroupName
}) {
  return (
    <Col xs="12" md="12">
      <Card className="material-card">
        <Card.Header>
          <h5>Group</h5>
        </Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", padding: "50px", lineHeight: "30px" }}>
            <h5>You currently do not belong to any group</h5>
            <p>Groups members sit down together during convocation</p>
            <Button
              variant="outline-success"
              onClick={() => toggleModal("showCreateGroupModal")}
            >
              Create Group &nbsp;&nbsp;
              <FontAwesomeIcon icon="user-plus" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showCreateGroupModal}
        onHide={() => toggleModal("showCreateGroupModal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Groups are mediums to get closer with one another, and they are uniquely
            named.
          </p>
          <br />
          <Form onSubmit={handleCreateGroup}>
            <Form.Group>
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Group name"
                name="newGroupName"
                value={newGroupName}
                onChange={handleChange}
                required
              />
              {createGroupErrorMsg.name ? (
                <p className="form-error-msg">{createGroupErrorMsg.name}</p>
              ) : null}
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              disabled={isLoading}
              className="btn-center"
            >
              {isLoading ? "Loading..." : "Create Group"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Col>
  );
}