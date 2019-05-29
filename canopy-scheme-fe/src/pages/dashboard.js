import React from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-content">
                    <h2>Welcome, Jane</h2>
                    <Row>
                        <Col xs="12" md="4">
                            <Card className="material-card">
                                <Card.Body>
                                    <h5>Profile</h5>
                                    <div className="text-center">
                                        <FontAwesomeIcon
                                            icon="user-circle"
                                            size="3x"
                                        />
                                        <h4>Jane Doe</h4>
                                        <h6>15cg00000</h6>
                                        <h6>jane.doe@stu.edu.ng</h6>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="12" md="8">
                            <Card className="material-card">
                                <Card.Body>
                                    <Button className="float-right">
                                        Make Payment
                                        {"  "}
                                        <FontAwesomeIcon icon="credit-card" />
                                    </Button>
                                    <h5>Payments</h5>
                                    <Table borderless hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>&#8358; Amount</th>
                                                <th>
                                                    {" "}
                                                    <FontAwesomeIcon icon="table" />{" "}
                                                    Tables
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>1,000</td>
                                                <td>12</td>
                                                <td>
                                                    <Button variant="link">
                                                        View Details
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>1,000</td>
                                                <td>12</td>
                                                <td>
                                                    <Button variant="link">
                                                        View Details
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>1,000</td>
                                                <td>12</td>
                                                <td>
                                                    <Button variant="link">
                                                        View Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="12" md="6">
                            <Card className="material-card">
                                <Card.Body>
                                    <Button
                                        className="float-right"
                                        variant="outline-danger"
                                    >
                                        Leave Group
                                        {"  "}
                                        <FontAwesomeIcon icon="door-open" />
                                    </Button>
                                    <h5>Group</h5>
                                    <br />
                                    <div className="text-center">
                                        <Button size="lg">
                                            Create Group
                                            {"  "}
                                            <FontAwesomeIcon icon="users" />
                                        </Button>
                                        <p>
                                            Create a group to make sure your
                                            friends and famiily sit near you
                                        </p>
                                    </div>
                                    <br />
                                    <h6>Members</h6>
                                    <p>
                                        <FontAwesomeIcon icon="user-circle" />{" "}
                                        Femi Ajisafe
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon="user-circle" />{" "}
                                        Paul Kimberly
                                    </p>
                                    <Button variant="outline-success">
                                        Invite new member
                                        {"  "}
                                        <FontAwesomeIcon icon="user-plus" />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default Dashboard;
