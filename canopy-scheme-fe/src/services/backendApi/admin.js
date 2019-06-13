import HTTP, { generateBearer } from "utils/http";
import * as ENDPOINTS from "./endpoints";

export default class AdminApi {
  /**
   * Get payments users have made
   */
  static getOfflineTransactions = async ({ page, limit, token }) => {
    return HTTP.get(
      ENDPOINTS.ADMIN_GET_TRANSACTIONS(page, limit),
      generateBearer(token)
    );
  };

  /**
   * Update a user's payment's status
   */
  static updatePaymentStatus = async ({
    reference,
    paymentStatus,
    adminMessage,
    token
  }) => {
    return HTTP.put(
      ENDPOINTS.UPDATE_TRANSACTION(reference),
      {
        status: paymentStatus,
        admin_message: adminMessage
      },
      generateBearer(token)
    );
  };
}
