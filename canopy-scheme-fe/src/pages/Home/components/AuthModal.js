import React from "react";
import { Modal } from "react-bootstrap";
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
    const { showAuthModal, toggleModal, history } = this.props;
    const { form } = this.state;
    return (
      <Modal show={showAuthModal} onHide={() => toggleModal()}>
        <Modal.Header closeButton>
          <Modal.Title styl={{ fontSize: "1.5rem" }}>{form} to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === "Login" && (
            <LoginComponent
              switchForm={this.switchForm}
              history={history}
              toggleModal={toggleModal}
            />
          )}
          {form === "Register" && (
            <RegisterComponent switchForm={this.switchForm} history={history} />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
