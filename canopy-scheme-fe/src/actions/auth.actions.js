import { UserStorage } from "../storage";
import { AuthApi } from "../services/backendApi";

class AuthActions {
  static async login({ email, password }) {
    try {
      const response = await AuthApi.login({ email, password });
      UserStorage.token = response.data.token;
      UserStorage.refreshToken = response.data.refresh_token;
      UserStorage.userInfo = response.data.user;
    } catch (err) {
      errorsAlert(err.msg);
      throw err;
    }
  }

  static async register({
    email,
    password,
    firstname,
    lastname,
    matricNo,
    telephoneNo
  }) {
    try {
      await AuthApi.register({
        email,
        password,
        firstname,
        lastname,
        matricNo,
        telephoneNo
      });
    } catch (err) {
      errorsAlert(err.msg);
      throw err;
    }
  }

  static async logout({
    email = UserStorage.userInfo.email,
    refreshToken = UserStorage.refreshToken,
    token = UserStorage.token
  }) {
    try {
      await AuthApi.logout({ email, refreshToken, token });
      UserStorage.unsetToken();
      UserStorage.unsetUserInfo();
      UserStorage.unsetRefreshToken();
    } catch (err) {
      errorsAlert(err.msg);
      throw err;
    }
  }
}

export default AuthActions;
