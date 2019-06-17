import { UserStorage } from "storage";
import { AuthApi } from "services/backendApi";
import { resolveRequestError } from "utils/http";

class AuthActions {
  static async login({ email, password, isAdmin }) {
    try {
      const { data } = await AuthApi.login({ email, password, isAdmin });
      UserStorage.token = data.token;
      UserStorage.refreshToken = data.refreshToken;
      if (!isAdmin) UserStorage.userInfo = { is_admin: false };
      const { msg } = data;
      return { msg };
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
      UserStorage.userInfo = { is_admin: false };
      return data.msg;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async logout(
    email = UserStorage.userInfo ? UserStorage.userInfo.email : null,
    refreshToken = UserStorage.refreshToken,
    token = UserStorage.token
  ) {
    try {
      if (UserStorage.userInfo) await AuthApi.logout({ email, refreshToken, token });
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
  static async resetPassword({ password, passwordConfirm, passwordToken }) {
    try {
      const response = await AuthApi.resetPassword({
        password,
        passwordConfirm,
        passwordToken
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
