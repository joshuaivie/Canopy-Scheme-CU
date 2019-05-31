import { UserApi } from "../services/backendApi";
import { errorAlert } from "../utils/notification";
import { UserStorage } from "../storage";

class UserAction {
  static async getTransactions({ token = UserStorage.token }) {
    try {
      const response = await UserApi.getTransactions({ token });
      return response.data.transactions;
    } catch (err) {}

    return [];
  }

  static async getProfile({ token = UserStorage.token }) {
    try {
      const response = await UserApi.getProfile({ token });
      return response.data.user;
    } catch (err) {
      errorAlert(err.msg);
      throw err;
    }
  }

  static async getReservations({ token = UserStorage.token }) {
    try {
      const response = await UserApi.getReservations({ token });
      return response.data.reservations;
    } catch (err) {}

    return [];
  }

  static async getGroup({ token = UserStorage.token }) {
    try {
      const response = await UserApi.getGroup({ token });
      return response.data.reservations;
    } catch (err) {
      errorAlert(err.msg);
      throw err;
    }
  }

  static async deleteGroup({ token = UserStorage.token }) {
    try {
      await UserApi.deleteGroup({ token });
    } catch (err) {
      errorAlert(err.msg);
      throw err;
    }
  }
}

export default UserAction;
