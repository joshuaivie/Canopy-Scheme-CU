import HTTP, { generateBearer } from "utils/http";
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

  /**
   * Leave group user belongs to.
   */
  static leaveGroup = async ({ token }) => {
    return HTTP.delete(ENDPOINTS.USER_GROUP_LEAVE, generateBearer(token));
  };

  /**
   * Removes a group member.
   */
  static removeMember = async ({ matricNo, deleteInvite, token }) => {
    return HTTP.delete(
      ENDPOINTS.USER_GROUP_MEMBER_REMOVE(matricNo, deleteInvite),
      generateBearer(token)
    );
  };
  /**
   * Changes a user's password.
   */
  static changePassword = async ({
    oldPassword,
    newPassword,
    newPasswordConfirm,
    token
  }) => {
    return HTTP.post(
      ENDPOINTS.PASSWORD_CHANGE,
      {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm
      },
      generateBearer(token)
    );
  };

  /**
   * Resend email verification link
   */
  static resendEmailVerificationLink = async ({ token }) => {
    return HTTP.get(ENDPOINTS.VERIFY_RESEND_EMAIL, generateBearer(token));
  };
}
