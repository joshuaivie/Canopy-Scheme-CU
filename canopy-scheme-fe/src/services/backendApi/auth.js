import HTTP, { generateBearer } from "utils/http";
import * as ENDPOINTS from "./endpoints";

export default class AuthApi {
  /**
   * Performs a login request to backend.
   */
  static login = async ({ email, password }) => {
    return HTTP.post(ENDPOINTS.LOGIN, { email, password });
  };

  /**
   * Performs a registration request to backend.
   */
  static register = async ({
    email,
    matricNo,
    password,
    firstname,
    lastname,
    telephoneNo
  }) => {
    return HTTP.post(ENDPOINTS.REGISTER, {
      email,
      matric_no: matricNo,
      password,
      firstname,
      lastname,
      telephone_no: telephoneNo
    });
  };

  /**
   * Performs a login request to backend.
   */
  static logout = async ({ email, refreshToken, token }) => {
    return HTTP.post(
      ENDPOINTS.LOGOUT,
      { email, refresh_token: refreshToken },
      generateBearer(token)
    );
  };
  /**
   * Sends in an email for password reset request.
   */
  static requestChangePassword = async ({ email }) => {
    return HTTP.post(ENDPOINTS.RESET_PASSWORD, { email });
  };
  /**
   * Resets a user's password.
   */
  static resetPassword = async ({ password, passwordConfirm, passwordToken }) => {
    return HTTP.post(`${ENDPOINTS.RESET_PASSWORD}/${passwordToken}`, {
      password,
      password_confirm: passwordConfirm
    });
  };

  /**
   * Verifies a user's email.
   */
  static verifyEmail = async ({ emailToken }) => {
    return HTTP.get(ENDPOINTS.VERIFY_EMAIL(emailToken));
  };
}
