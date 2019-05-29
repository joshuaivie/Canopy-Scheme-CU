import React from "react";
import { Button, Card, Col, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderEmptyGroup = columns => (
    <td
        colSpan={columns.length}
        style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
    >
        <div className="text-center">
            <Button>
                Create Group
                <FontAwesomeIcon icon="users" />
            </Button>
            <br />
            <br />

            <p>
                Create a group to make sure your friends and famiily sit near
                you
            </p>
        </div>
    </td>
);

const RenderGroupHistory = (data, columns) => (
    <tr>
        {columns.map(column => (
            <td key={column.name}>{column.name}</td>
        ))}
    </tr>
);

const DisplayGroupMembers = props => {
    return (
        <Table borderless hover responsive>
            <tbody>
                {props.data.length > 0
                    ? RenderEmptyGroup(props.columns)
                    : RenderGroupHistory(props.columns)}
            </tbody>
        </Table>
    );
};

class Groups extends React.Component {
    state = {
        data: [
            // {
            // 	date: "12-03-19",
            // 	amount: "15,000",
            // 	tables: "1"
            // },
            // {
            // 	date: "26-03-19",
            // 	amount: "45,000",
            // 	tables: "3"
            // }
        ],
        show: false
    };

    handleOpen = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };
    render() {
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
                        {/* <br />
                        <h6>Members</h6>
                        <p>
                            <FontAwesomeIcon icon="user-circle" /> Femi Ajisafe
                        </p>
                        <p>
                            <FontAwesomeIcon icon="user-circle" /> Paul Kimberly
                        </p>
                        <Button variant="outline-success">
                            Invite new member
                            {"  "}
                            <FontAwesomeIcon icon="user-plus" />
						</Button> */}
                        <p style={{ textAlign: "center" }}>
                            Invite your friends to share your joy
                        </p>
                        <div className="group-container-mobile">
                            <Button
                                variant="outline-success"
                                onClick={this.handleOpen}
                            >
                                Invite new member
                                {"  "}
                                <FontAwesomeIcon icon="user-plus" />
                            </Button>
                        </div>
                        <div className="group-container">
                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={this.handleOpen}
                            >
                                <FontAwesomeIcon icon="plus" />
                            </Button>
                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={this.handleOpen}
                            >
                                <FontAwesomeIcon icon="plus" />
                            </Button>
                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={this.handleOpen}
                            >
                                <FontAwesomeIcon icon="plus" />
                            </Button>
                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={this.handleOpen}
                            >
                                <FontAwesomeIcon icon="plus" />
                            </Button>
                            <Button
                                size="lg"
                                className="btn-primary"
                                onClick={this.handleOpen}
                            >
                                <FontAwesomeIcon icon="plus" />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Enter your friend's matriculation number
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Matriculation Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Matriculation Number"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Add to Group
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        );
    }
}

export default Groups;
