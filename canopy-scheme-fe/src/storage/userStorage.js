/* eslint-disable no-undef */
const USER_TOKEN = "USER_TOKEN";
const USER_INFO = "USER_INFO";
const USER_REFRESH_TOKEN = "USER_REFRESH_TOKEN";

class UserStorage {
  /**
   * Gets the user's authentication token from local storage.
   */
  static get token() {
    const tk = localStorage.getItem(USER_TOKEN);
    return tk == null ? tk : atob(tk);
  }

  /**
   * Sets the user's authentication token to local storage.
   */
  static set token(token) {
    localStorage.setItem(USER_TOKEN, btoa(token));
  }

  static unsetToken() {
    localStorage.removeItem(USER_TOKEN);
  }

  /**
   * Gets the user's refresh token from local storage.
   */
  static get refreshToken() {
    const tk = localStorage.getItem(USER_REFRESH_TOKEN);
    return tk != null ? atob(tk) : tk;
  }

  /**
   * Sets the user's refresh token to local storage.
   */
  static set refreshToken(token) {
    localStorage.setItem(USER_REFRESH_TOKEN, btoa(token));
  }

  static unsetRefreshToken() {
    localStorage.removeItem(USER_REFRESH_TOKEN);
  }

  /**
   * Sets the user info to local storage.
   */
  static get userInfo() {
    const info = localStorage.getItem(USER_INFO);
    return info != null ? JSON.parse(atob(info)) : info;
  }

  static updateUserInfo(values = {}) {
    let { userInfo } = UserStorage;
    if (userInfo == null) userInfo = {};
    for (const key of Object.keys(values)) {
      userInfo[key] = values[key];
    }
    UserStorage.userInfo = userInfo;
  }

  /**
   * Sets the user info to local storage.
   */
  static set userInfo(user) {
    localStorage.setItem(USER_INFO, btoa(JSON.stringify(user)));
  }

  static unsetUserInfo() {
    localStorage.removeItem(USER_INFO);
  }
}

export default UserStorage;
