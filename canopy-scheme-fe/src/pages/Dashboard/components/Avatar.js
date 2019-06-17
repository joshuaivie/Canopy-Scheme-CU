import React from "react";
import { Image, Dropdown, Button } from "react-bootstrap";
import { AuthAction } from "actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "routes";
import { NetworkAvailabilityContext } from "utils/http";
import { UserStorage } from "storage";

class CustomToggle extends React.PureComponent {
  handleClick = e => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e);
  };

  render() {
    let avatarImg = "https://image.flaticon.com/icons/svg/149/149452.svg";
    if (UserStorage.userInfo && UserStorage.userInfo.matric_no) {
      avatarImg = `https://res.cloudinary.com/canopy-scheme/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_1px_solid_red,b_rgb:fbf8fb/avatar/${UserStorage.userInfo.matric_no.toUpperCase()}.jpg`;
    }
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
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { toggleChangePasswordModal, isAdmin } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu alignRight>
          <Dropdown.Item target="_blank" href="https://cpc-partners.webflow.io">
            <Button variant="link" className="primary-text">
              <FontAwesomeIcon icon="users" />
              &nbsp;Partners
            </Button>
          </Dropdown.Item>
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
