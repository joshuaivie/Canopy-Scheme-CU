import * as ENDPOINTS from "./endpoints";
import HTTP, { generateBearer } from "utils/http";
import { UserStorage } from "storage";

export default class TableApi {
  static purchaseTable = async ({
    totalTables,
    amount,
    paystackRef,
    token = UserStorage.token
  }) => {
    return HTTP.post(
      ENDPOINTS.TABLE_PURCHASE,
      { total_tables: totalTables, amount, paystack_ref: paystackRef },
      generateBearer(token)
    );
  };
}
