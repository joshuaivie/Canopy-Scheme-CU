import React from "react";
import { Modal, Col, Row } from "react-bootstrap";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import shieldSvg from "../../assets/svg/shield.svg";

class AuthModal extends React.Component {
  state = {
    form: "Login"
  };

  switchForm = () => {
    const { form } = this.state;
    this.setState({ form: form === "Login" ? "Register" : "Login" });
  };

  render() {
    const { show, toggleModal } = this.props;
    const { form } = this.state;
    return (
      <Modal size="lg" show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", fontSize: "1.5rem" }}>
            {form} to continue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12" md="6" className="text-center">
              <img src={shieldSvg} width="150" alt="shield illustration" />
            </Col>
            <Col xs="12" md="6">
              {form === "Login" && (
                <LoginComponent switchForm={this.switchForm} />
              )}
              {form === "Register" && (
                <RegisterComponent switchForm={this.switchForm} />
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
