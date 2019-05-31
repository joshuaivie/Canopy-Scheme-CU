import React from "react";
import { Button, Card, Col, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateMatricNo } from "../../utils/validateMatric";

class Groups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      newMember: "",
      groupMembers: [
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
        { name: "Emmanuel Awotunde", matricNumber: "15cg03621" },
      ],
      isLoading: false
    };
  }

  componentDidMount() {
    //Fethc the API call for isGroOwner, isMember
  }

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
    <Button size="lg" className="btn-primary invite-button" onClick={this.handleOpen}>
      <FontAwesomeIcon icon="plus" />
    </Button>
  );

  renderEmptyGroup = () => (
    <Col xs="12" md="12">
      <Card className="material-card">
        <Card.Header>
          <h5>Group</h5>
        </Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", padding: "50px", lineHeight: "30px" }}>
            <h5>You haven't Joined or Created a group</h5>
            <p>A description of what a group is about</p>
            <Button variant="outline-success" onClick={this.handleCreateGroup}>
              Create Group
              {"  "}
              <FontAwesomeIcon icon="user-plus" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  renderGroupAdminMembers = ({ groupMembers }) =>
    groupMembers.map((groupMember, index) =>
      groupMember !== "" && groupMember !== null ? (
        <div key={"member_" + index}>
          <Card className="material-card" key={"member_" + index}>
            <Card.Img />
            <Card.Title>{groupMember.name}</Card.Title>
            <Card.Text>{groupMember.matricNumber}</Card.Text>
            <Button
              className="remove-button"
              onClick={() => this.handleRemoveMember(groupMember.matricNumber)}
            >
              <FontAwesomeIcon icon="user-minus" />
            </Button>
          </Card>
        </div>
      ) : (
        <this.AddGroupMembers key={"member_" + index} />
      )
    );

  render() {
    const { newMember, groupMembers } = this.state;
    const groupAdmin = false;
    // const groupAdmin = true;
    if (groupMembers.length <= 0) {
      return <this.renderEmptyGroup />;
    }
    if (groupAdmin) {
      return (
        // Group Admin should be able to
        // View groups, Delete Group, Remove members
        <Col xs="12" md="12">
          <Card className="material-card">
            <Card.Header>
              <h5>Group</h5>
              <Button variant="outline-danger" onClick={this.handleGroup}>
                Delete Group
                <FontAwesomeIcon icon="door-open" />
              </Button>
            </Card.Header>
            <Card.Body>
              <p style={{ textAlign: "center" }}>
                Invite your friends to share your joy
              </p>
              <div className="group-container">
                <this.renderGroupAdminMembers groupMembers={groupMembers} />
              </div>
              <div className="group-container-mobile">
                <this.renderGroupAdminMembers groupMembers={groupMembers} />
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
              <Button type="submit" variant="primary" onClick={this.handleAddButton}>
                {this.state.isLoading ? "Loading..." : "Add to Group"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      );
    } else {
      return (
        <Col xs="12" md="12">
          <Card className="material-card">
            <Card.Header>
              <h5>Group</h5>
              <Button variant="outline-danger" onClick={this.handleGroup}>
                Leave Group
                <FontAwesomeIcon icon="door-open" />
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="group-container">
                {groupMembers.map((groupMember, index) => (
                  <Card key={"member_" + index}>
                    <Card.Title>{groupMember.name}</Card.Title>
                    <Card.Text>{groupMember.matricNumber}</Card.Text>
                  </Card>
                ))}
              </div>
              <div className="group-container-mobile">
                {groupMembers.map((groupMember, index) => (
                  <Card key={"member_" + index}>
                    <Card.Title>{groupMember.name}</Card.Title>
                    <Card.Text>{groupMember.matricNumber}</Card.Text>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }
  }
}

export default Groups;
