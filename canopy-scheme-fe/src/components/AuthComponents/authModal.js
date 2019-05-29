import React from "react";
import { Modal } from "react-bootstrap";
import LoginComponent from "./login";
import RegisterComponent from "./register";

class AuthModal extends React.Component {
    state = {
        form: "login"
    };

    switchForm = () => {
        const { form } = this.state;
        this.setState({ form: form === "login" ? "register" : "login" });
    };

    render() {
        const { show, toggleModal } = this.props;
        const { form } = this.state;
        return (
            <Modal size="lg" show={show} onHide={toggleModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    {form === "login" && (
                        <LoginComponent switchForm={this.switchForm} />
                    )}
                    {form === "register" && (
                        <RegisterComponent switchForm={this.switchForm} />
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

export default AuthModal;
