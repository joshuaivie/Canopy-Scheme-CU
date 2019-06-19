/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { AdminApi } from "services/backendApi";
import { UserStorage } from "storage";
import { resolveRequestError } from "utils/http";

class AdminAction {
  static async getOfflineTransactions({
    page,
    statusType = "all",
    limit = 50,
    token = UserStorage.token
  }) {
    try {
      const response = await AdminApi.getOfflineTransactions({
        page,
        statusType,
        limit,
        token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err);
    }

    return [];
  }

  static async updateOfflineTransaction({
    reference,
    transactionStatus,
    adminMessage,
    token = UserStorage.token
  }) {
    try {
      const response = await AdminApi.updateOfflineTransaction({
        reference,
        transactionStatus,
        adminMessage,
        token
      });
      return response.data;
    } catch (err) {
      resolveRequestError(err);
    }
  }
}

export default AdminAction;
