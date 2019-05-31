import React from "react";
import { Modal, Col } from "react-bootstrap";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

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
          {form === "Login" && <LoginComponent switchForm={this.switchForm} />}
          {form === "Register" && <RegisterComponent switchForm={this.switchForm} />}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
