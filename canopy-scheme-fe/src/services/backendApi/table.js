import * as ENDPOINTS from "./endpoints";
import { HTTP, generateBearer } from "../../utils/fetch";

export default class TableApi {
  static purchaseTable = async (totalTables, amount, paystackRef, token) => {
    return HTTP.post(
      ENDPOINTS.TABLE_PURCHASE,
      { total_tables: totalTables, amount, paystack_ref: paystackRef },
      generateBearer(token)
    );
  };
}
