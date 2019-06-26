import React from "react";
import { successAlert } from "utils/notification";
import { UserAction } from "actions";
import { Modal, Button, Form } from "react-bootstrap";
import { BtnLoadingSpinner } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

class ChangePasswordModal extends React.Component {
  state = this.initialState;

  get initialState() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      isLoading: false,
      errorMsg: {}
    };
  }
  static contextType = NetworkAvailabilityContext;

  resetState = (params = {}) => {
    this.setState({ ...this.initialState, ...params });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ isLoading: true, errorMsg: {} });
    this.changePassword();
    event.preventDefault();
  };

  async changePassword() {
    try {
      const { toggleModal } = this.props;
      const { oldPassword, newPassword, newPasswordConfirm } = this.state;
      const response = await UserAction.changePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm
      });
      successAlert(response.msg);
      this.resetState();
      toggleModal();
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }
  render() {
    const { toggleModal, showChangePasswordModal } = this.props;
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      errorMsg,
      isLoading
    } = this.state;
    return (
      <Modal show={showChangePasswordModal} onHide={() => toggleModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Change your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your old password"
                name="oldPassword"
                value={oldPassword}
                onChange={this.handleChange}
                required
              />
              {errorMsg.old_password ? (
                <p className="form-error-msg">{errorMsg.old_password}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your new password"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
                required
              />
              {errorMsg.new_password ? (
                <p className="form-error-msg">{errorMsg.new_password}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password Confirm</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                name="newPasswordConfirm"
                value={newPasswordConfirm}
                onChange={this.handleChange}
                required
              />
              {errorMsg.new_password_confirm ? (
                <p className="form-error-msg">{errorMsg.new_password_confirm}</p>
              ) : null}
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="btn-center"
              disabled={isLoading || this.context.offline}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Change Password"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChangePasswordModal;
