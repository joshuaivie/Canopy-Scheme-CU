import React from "react";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Profile extends React.Component {
    state = {
        profile: []
    };
    render() {
        return (
            <Col xs="12" md="12">
                <Card className="material-card">
                    <Card.Body>
                        <h5>Profile</h5>
                        <div className="text-center">
                            <FontAwesomeIcon icon="user-circle" size="3x" />
                            <h4>Jane Doe</h4>
                            <h6>15cg00000</h6>
                            <h6>jane.doe@stu.edu.ng</h6>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default Profile;
