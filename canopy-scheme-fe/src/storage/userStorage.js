const USER_TOKEN = "USER_TOKEN";
const USER_INFO = "USER_INFO";
// import LocalForage from "localforage";

class UserStorage {
  /**
   * Gets the user's authentication token from local storage.
   */
  static get token() {
    return localStorage.getItem(USER_TOKEN);
  }

  /**
   * Sets the user's authentication token to local storage.
   */
  static set token(token) {
    localStorage.setItem(USER_TOKEN, token);
  }

  static unsetToken = () => {
    localStorage.removeItem(USER_TOKEN);
  };

  /**
   * Sets the user info to local storage.
   */
  static get userInfo() {
    return localStorage.getItem(USER_INFO);
  }

  /**
   * Sets the user info to local storage.
   */
  static set userInfo(user) {
    localStorage.setItem(USER_INFO, user);
  }

  static unsetUserInfo = () => {
    localStorage.removeItem(USER_INFO);
  };
}

export default UserStorage;
