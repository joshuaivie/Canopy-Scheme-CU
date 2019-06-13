/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { UserApi } from "services/backendApi";
import { UserStorage } from "storage";
import { resolveRequestError } from "utils/http";

class UserAction {
  static async getTransactions({ token } = UserStorage) {
    try {
      const response = await UserApi.getTransactions({ token });
      return response.data.transactions;
    } catch (err) {
      resolveRequestError(err, false); // only displays error when offline.
    }

    return [];
  }

  static async getProfile({ token } = UserStorage) {
    try {
      const { data } = await UserApi.getProfile({ token });
      UserStorage.userInfo = data.profile;
    } catch (err) {
      resolveRequestError(err, false); // only displays error when offline.
    }
  }

  static async getReservations({ token } = UserStorage) {
    try {
      const response = await UserApi.getReservations({ token });
      return response.data.reservations;
    } catch (err) {
      resolveRequestError(err, false); // only displays error when offline.
    }

    return [];
  }

  static async getGroup({ token = UserStorage.token, showAllAlerts = true }) {
    try {
      const response = await UserApi.getGroup({ token });
      return response.data.group;
    } catch (err) {
      resolveRequestError(err, showAllAlerts); // only displays error when offline.
    }
  }

  static async deleteGroup({ token } = UserStorage) {
    try {
      const response = await UserApi.deleteGroup({ token });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }

  static async leaveGroup({ token } = UserStorage) {
    try {
      const response = await UserApi.leaveGroup({ token });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }

  static async removeMember({ matricNo, token = UserStorage.token }) {
    try {
      const response = await UserApi.removeMember({ matricNo, token });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }

  static async changePassword({
    oldPassword,
    newPassword,
    newPasswordConfirm,
    token = UserStorage.token
  }) {
    try {
      const response = await UserApi.changePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm,
        token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }

  static async resendEmailVerificationLink() {
    try {
      const response = await UserApi.resendEmailVerificationLink({
        token: UserStorage.token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }
}

export default UserAction;
