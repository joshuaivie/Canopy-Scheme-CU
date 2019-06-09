import React from "react";
import { Image, Dropdown, Button } from "react-bootstrap";
import { AuthAction, UserAction } from "actions";
import { errorAlert, successAlert } from "utils/notification";
import avatarImg from "assets/img/portrait.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "routes";
import { UserStorage } from "storage";

class CustomToggle extends React.PureComponent {
  handleClick = e => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e);
  };

  render() {
    return (
      <React.Fragment>
        <Image
          src={avatarImg}
          className="dropdown-toggle"
          roundedCircle
          style={{ width: "50px", height: "50px" }}
          onClick={this.handleClick}
        />
        <FontAwesomeIcon icon="caret-down" />
      </React.Fragment>
    );
  }
}

class Avatar extends React.PureComponent {
  logout = async () => {
    try {
      await AuthAction.logout();
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      errorAlert(
        error.message || "You cannot log out till you are connected to the internet"
      );
    }
  };

  resendEmailVerificationLink = async () => {
    try {
      const { msg } = await UserAction.resendEmailVerificationLink();
      successAlert(msg);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { toggleChangePasswordModal } = this.props;
    const { userInfo } = UserStorage;
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={() => toggleChangePasswordModal()}>
            <Button variant="link" className="primary-text">
              Change Password &nbsp;{" "}
              <FontAwesomeIcon className="primary-text" icon="lock" />
            </Button>
          </Dropdown.Item>
          {!userInfo.email_verified && (
            <Dropdown.Item onClick={() => this.resendEmailVerificationLink({})}>
              <Button variant="link" className="primary-text">
                Resend email verification link &nbsp;{" "}
              </Button>
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={this.logout}>
            <Button variant="link" className="primary-text">
              Logout &nbsp;{" "}
              <FontAwesomeIcon className="primary-text" icon="power-off" />
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Avatar;
