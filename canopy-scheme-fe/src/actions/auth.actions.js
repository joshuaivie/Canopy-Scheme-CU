import { UserStorage } from "../storage";
import { AuthApi } from "../services/backendApi";
import { resolveRequestError } from "../utils/HTTP";

class AuthActions {
  static async login({ email, password }) {
    try {
      const { data } = await AuthApi.login({ email, password });
      UserStorage.token = data.token;
      UserStorage.refreshToken = data.refreshToken;
      UserStorage.userInfo = data.user;
    } catch (err) {
      throw resolveRequestError(err);
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
      const { data } = await AuthApi.register({
        email,
        password,
        firstname,
        lastname,
        matricNo,
        telephoneNo
      });
      UserStorage.token = data.token;
      UserStorage.refreshToken = data.refreshToken;
      UserStorage.userInfo = data.user;
    } catch (err) {
      throw resolveRequestError(err);
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
      throw resolveRequestError(err);
    }
  }
}

export default AuthActions;
