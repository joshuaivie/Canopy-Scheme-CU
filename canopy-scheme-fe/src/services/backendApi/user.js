import { HTTP, generateBearer } from "../../helpers/http";
import * as ENDPOINTS from "./endpoints";

export default class UserApi {
  /**
   * Get all previous transactions of a user.
   */
  static getTransactions = async ({ token }) => {
    return HTTP.get(ENDPOINTS.USER_TRANSACTIONS, generateBearer(token));
  };

  /**
   * Get profile of user.
   */
  static getProfile = async ({ token }) => {
    return HTTP.get(ENDPOINTS.USER, generateBearer(token));
  };

  /**
   * Get all previous reservations of a user.
   */
  static getReservations = async ({ token }) => {
    return HTTP.get(ENDPOINTS.USER_RESERVATIONS, generateBearer(token));
  };

  /**
   * Get group of a user.
   */
  static getGroup = async ({ token }) => {
    return HTTP.get(ENDPOINTS.USER_GROUP, generateBearer(token));
  };

  /**
   * Delete group of a user.
   */
  static deleteGroup = async ({ token }) => {
    return HTTP.delete(ENDPOINTS.USER_GROUP, generateBearer(token));
  };
}
