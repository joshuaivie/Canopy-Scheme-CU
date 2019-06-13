import React from "react";
import { Image, Dropdown, Button } from "react-bootstrap";
import { AuthAction } from "actions";
import { errorAlert } from "utils/notification";
import avatarImg from "assets/img/portrait.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "routes";
import { NetworkAvailabilityContext } from "utils/http";

class CustomToggle extends React.PureComponent {
  handleClick = e => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e);
  };

  render() {
    return (
      <Button onClick={this.handleClick} variant="link" className="dark-text">
        <Image
          src={avatarImg}
          className="dropdown-toggle"
          roundedCircle
          style={{ width: "50px", height: "50px" }}
        />
        <FontAwesomeIcon icon="caret-down" />
      </Button>
    );
  }
}

class Avatar extends React.PureComponent {
  static contextType = NetworkAvailabilityContext;

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

  render() {
    const { toggleChangePasswordModal, isAdmin } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu alignRight>
          {!isAdmin && (
            <Dropdown.Item onClick={() => toggleChangePasswordModal()}>
              <Button variant="link" className="primary-text">
                <FontAwesomeIcon className="primary-text" icon="lock" />
                &nbsp; Change Password
              </Button>
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={this.logout}>
            <Button
              variant="link"
              className="primary-text"
              disabled={!this.context.online}
            >
              <FontAwesomeIcon className="primary-text" icon="power-off" />
              &nbsp; Logout
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Avatar;
