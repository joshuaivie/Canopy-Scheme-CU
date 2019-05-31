import { HTTP, generateBearer } from "../../utils/fetch";
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
}
