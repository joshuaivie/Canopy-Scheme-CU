import React from "react";
import { Container, Row } from "react-bootstrap";
import Groups from "pages/Dashboard/components/Group";
import Payments from "pages/Dashboard/components/Payments";
import { UserStorage } from "storage";
import Avatar from "./components/Avatar";

export default ({ history }) => {
  const { userInfo } = UserStorage;
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h4 className="welcome-text">
          Welcome, {` ${userInfo.firstname} ${userInfo.lastname}`}
        </h4>
        <Avatar history={history} />
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
