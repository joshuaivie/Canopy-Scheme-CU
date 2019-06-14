import HTTP, { generateBearer } from "utils/http";
import * as ENDPOINTS from "./endpoints";

export default class AdminApi {
  /**
   * Get offline transactions users have made
   */
  static getOfflineTransactions = async ({ page, limit, token }) => {
    return HTTP.get(
      ENDPOINTS.ADMIN_GET_TRANSACTIONS(page, limit),
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
      ENDPOINTS.UPDATE_TRANSACTION(reference),
      {
        status: transactionStatus,
        admin_message: adminMessage
      },
      generateBearer(token)
    );
  };
}
