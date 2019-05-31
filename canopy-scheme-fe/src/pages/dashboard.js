import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";

import Groups from "../components/DashboardComponents/Groups";
import Payments from "../components/DashboardComponents/Payments";
import studentSvg from "../assets/svg/student.svg";
import { UserStorage } from "storage";

class Dashboard extends React.Component {
  render() {
    const { userInfo } = UserStorage;
    return (
      <div className="dashboard">
        <Container>
          <Row>
            <Col xs="12" md="6">
              <h2>Welcome, {`${userInfo.firstname} ${userInfo.lastname}`}</h2>
            </Col>
            <Col xs="12" md="6">
              <Image src={studentSvg} roundedCircle style={{ width: "50px" }} />
            </Col>
          </Row>
          <Row>
            <Payments />
            <Groups />
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
