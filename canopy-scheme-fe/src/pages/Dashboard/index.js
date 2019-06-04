import React from "react";
import { Container, Row } from "react-bootstrap";
import Groups from "pages/Dashboard/components/Group";
import Payments from "pages/Dashboard/components/Payments";
import Avatar from "components/DashboardComponents/Avatar";
import { UserStorage } from "storage";

export default () => {
  const { userInfo } = UserStorage;
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3>Welcome, {`${userInfo.firstname} ${userInfo.lastname}`}</h3>
        <Avatar />
      </div>
      <Container>
        <Row>
          <Payments />
          <Groups />
        </Row>
      </Container>
    </div>
  );
};
