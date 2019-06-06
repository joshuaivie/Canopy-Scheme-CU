/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { UserApi } from "services/backendApi";
import { errorAlert } from "utils/notification";
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
      const response = await UserApi.getProfile({ token });
      return response.data.user;
    } catch (err) {
      errorAlert(err.msg);
      throw err;
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
      throw resolveRequestError(err, showAllAlerts);
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
    old_password,
    new_password,
    new_password_confirm,
    token = UserStorage.token
  }) {
    try {
      const response = await UserApi.changePassword({
        old_password,
        new_password,
        new_password_confirm,
        token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }
}

export default UserAction;
