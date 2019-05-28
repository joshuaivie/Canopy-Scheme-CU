import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import tentSvg from "../../assets/svg/tent.svg";
import familySvg from "../../assets/svg/family.svg";
import dinningTableSvg from "../../assets/svg/dinning-table.svg";

export default () => (
    <React.Fragment>
        <div className="section">
            <Row>
                <Col xs="12" md="6" className="left">
                    <h1
                        style={{
                            fontSize: 80
                        }}
                    >
                        Canopy <br /> Scheme
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.{" "}
                    </p>
                    <Button>Book a tent</Button>
                </Col>
                <Col xs="12" md="6" className="right">
                    <img src={tentSvg} width="500" alt="" />
                </Col>
            </Row>
        </div>
        <div className="section">
            <Row>
                <Col xs="12" md="6" className="left">
                    <h1>Pricing</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.{" "}
                    </p>
                    <Button>Get a table</Button>
                </Col>
                <Col xs="12" md="6" className="right">
                    <img src={dinningTableSvg} width="500" alt="" />
                </Col>
            </Row>
        </div>
        <div className="section">
            <Row>
                <Col xs="12" md="6" className="left">
                    <h1>Groups</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.{" "}
                    </p>
                    <Button>Create a group</Button>
                </Col>
                <Col xs="12" md="6" className="right">
                    <img src={familySvg} width="500" alt="" />
                </Col>
            </Row>
        </div>
    </React.Fragment>
);
