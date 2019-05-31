import React from "react";
import { Button, Card, Col, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { validateMatricNo } from "../../utils/validateMatric";

class Groups extends React.Component {
  state = {
    show: false,
    newMember: "",
    groupMembers: ["15cg03621", "14ck023434", "15af02173", "", ""],
    isLoading: false
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddButton = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { newMember } = this.state;
    const validation = validateMatricNo(newMember);
    if (!validation.error) {
      console.log(``);
    } else {
      console.log(`Matriculation Number not Validated`);
    }
    this.setState({ isLoading: false });
  };

  AddGroupMembers = () => (
    <Button size="lg" className="btn-primary" onClick={this.handleOpen}>
      <FontAwesomeIcon icon="plus" />
    </Button>
  );

  render() {
    const { newMember, groupMembers } = this.state;
    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Group</h5>
            {/* <Button variant="outline-danger">
							Leave Group
							<FontAwesomeIcon icon="door-open" />
						</Button> */}
          </Card.Header>
          <Card.Body>
            <p style={{ textAlign: "center" }}>
              Invite your friends to share your joy
            </p>
            <div className="group-container">
              {groupMembers.map((groupMember, index) =>
                groupMember !== "" && groupMember !== null ? (
                  <div className="group-member-box" key={"member_" + groupMember}>{groupMember}</div>
                ) : (
                  <this.AddGroupMembers key={"member_" + index} />
                )
              )}
            </div>
            <div className="group-container-mobile">
              {groupMembers.map((groupMember, index) => (
                <div key={groupMember + index}>{groupMember}</div>
              ))}
              {groupMembers.length < 5 ? (
                <Button variant="outline-success" onClick={this.handleOpen}>
                  Invite new member
                  {"  "}
                  <FontAwesomeIcon icon="user-plus" />
                </Button>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your friend's matriculation number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleAddButton}>
              <Form.Group>
                <Form.Label>Matriculation Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Matriculation Number"
                  name="newMember"
                  value={newMember}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={this.handleAddButton}
            >
              {this.state.isLoading ? "Loading..." : "Add to Group"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

export default Groups;
