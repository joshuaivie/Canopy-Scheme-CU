/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { AdminApi } from "services/backendApi";
import { UserStorage } from "storage";
import { resolveRequestError } from "utils/http";

class AdminAction {
  static async getOfflineTransactions({ page, limit = 50, token = UserStorage.token }) {
    try {
      const response = await AdminApi.getOfflineTransactions({ page, limit, token });
      return response.data;
    } catch (err) {
      resolveRequestError(err, false); // only displays error when offline.
    }

    return [];
  }

  static async updateOfflineTransaction({
    reference,
    paymentStatus,
    adminMessage,
    token = UserStorage.token
  }) {
    try {
      const response = await AdminApi.changePassword({
        reference,
        paymentStatus,
        adminMessage,
        token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err); // only displays error when offline.
    }
  }
}

export default AdminAction;
