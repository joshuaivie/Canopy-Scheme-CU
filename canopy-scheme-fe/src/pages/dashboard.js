import React from "react";
import { Container, Row } from "react-bootstrap";

import Groups from "../components/DashboardComponents/Groups";
import Payments from "../components/DashboardComponents/Payments";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Container>
          <h2>Welcome, Jane</h2>
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
