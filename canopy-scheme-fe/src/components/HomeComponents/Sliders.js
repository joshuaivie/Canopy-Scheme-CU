import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Contact from "./Contact";
import tentSvg from "../../assets/svg/tent.svg";
import familySvg from "../../assets/svg/family.svg";
import dinningTableSvg from "../../assets/svg/dinning-table.svg";

export default ({ toggleModal }) => (
  <div id="landing-page">
    <div className="section">
      <Row>
        <Col xs="12" md="6" className="left">
          <h1 className="primary-text">Canopy Scheme</h1>
          <p>
            Make every moment of your convocation worth it by having order, organization
            and color around as your spend your day with family and loved ones. Book a
            spot today!{" "}
          </p>
          <Button
            onClick={() => {
              toggleModal();
            }}
          >
            Make a reservation
          </Button>
        </Col>
        <Col xs="12" md="6" className="right">
          <img src={tentSvg} alt="" />
        </Col>
      </Row>
    </div>
    <div className="section">
      <Row>
        <Col xs="12" md="6" className="left">
          <h1>Pricing</h1>
          <p>
            Different packages to match different needs. Find what suits your
            requirements here.{" "}
          </p>
          <Button
            onClick={() => {
              toggleModal();
            }}
          >
            Make a reservation
          </Button>
        </Col>
        <Col xs="12" md="6" className="right">
          <img src={dinningTableSvg} alt="" />
        </Col>
      </Row>
    </div>
    <div className="section">
      <Row>
        <Col xs="12" md="6" className="left">
          <h1>Groups</h1>
          Got graduating friends you want close by you?
          <ul>
            <li>Create a group link invite your friends</li>
            <li>Your group would be allocated around one another</li>
            <li>Maximum group size is 5</li>
          </ul>
          <Button
            onClick={() => {
              toggleModal();
            }}
          >
            Create a group
          </Button>
        </Col>
        <Col xs="12" md="6" className="right">
          <img src={familySvg} alt="" />
        </Col>
      </Row>
    </div>
    <Contact />
  </div>
);
