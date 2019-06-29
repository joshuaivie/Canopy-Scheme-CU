import HTTP, { generateBearer } from "utils/http";
import * as ENDPOINTS from "./endpoints";

export default class AdminApi {
  /**
   * Get offline transactions users have made
   */
  static getOfflineTransactions = async ({ page, statusType, limit, token }) => {
    return HTTP.get(
      ENDPOINTS.TRANSACTIONS_OFFLINE(page, statusType, limit),
      generateBearer(token)
    );
  };

  /**
   * Update a user's offline transaction's status
   */
  static updateOfflineTransaction = async ({
    reference,
    transactionStatus,
    adminMessage,
    token
  }) => {
    return HTTP.put(
      ENDPOINTS.TRANSACTIONS_UPDATE,
      {
        reference,
        status: transactionStatus,
        admin_message: adminMessage
      },
      generateBearer(token)
    );
  };
}
