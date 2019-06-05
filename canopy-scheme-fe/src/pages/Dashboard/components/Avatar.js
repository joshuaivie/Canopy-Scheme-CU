import React from "react";
import { Image, Dropdown, Button } from "react-bootstrap";
import { AuthAction } from "actions";
import { errorAlert } from "utils/notification";
import avatarImg from "assets/img/portrait.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          style={{ width: "50px" }}
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
      window.location.href = "/";
    } catch (error) {
      errorAlert(
        error.message || "You cannot log out till you are connected to the internet"
      );
    }
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={this.logout}>
            <Button onClick={this.logout} variant="link" className="primary-text">
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
