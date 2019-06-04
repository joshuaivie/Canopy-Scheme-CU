import React from "react";
import { Container, Row } from "react-bootstrap";

import Groups from "components/DashboardComponents/Groups";
import Payments from "components/DashboardComponents/Payments";
import Avatar from "components/DashboardComponents/Avatar";
import { UserStorage } from "storage";

export default () => {
  const { userInfo } = UserStorage;
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h4 className="welcome-text">
          Welcome,
          {`${userInfo.firstname} ${userInfo.lastname}`}
        </h4>
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
