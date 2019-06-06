import { UserStorage } from "storage";
import { AuthApi } from "services/backendApi";
import { resolveRequestError } from "utils/http";

class AuthActions {
  static async login({ email, password }) {
    try {
      const { data } = await AuthApi.login({ email, password });
      UserStorage.token = data.token;
      UserStorage.refreshToken = data.refreshToken;
      UserStorage.userInfo = data.user;
      return data.msg;
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
      return data.msg;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async logout(
    email = UserStorage.userInfo.email,
    refreshToken = UserStorage.refreshToken,
    token = UserStorage.token
  ) {
    try {
      await AuthApi.logout({ email, refreshToken, token });
      UserStorage.unsetToken();
      UserStorage.unsetUserInfo();
      UserStorage.unsetRefreshToken();
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async requestChangePassword({ email }) {
    try {
      const response = await AuthApi.requestChangePassword({ email });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  // eslint-disable-next-line camelcase
  static async resetPassword({ password, password_confirm, token }) {
    try {
      const response = await AuthApi.resetPassword({
        password,
        password_confirm,
        token
      });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async verifyEmail({ emailToken }) {
    try {
      const response = await AuthApi.verifyEmail({ emailToken });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }
}

export default AuthActions;
