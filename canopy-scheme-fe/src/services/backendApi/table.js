import * as ENDPOINTS from "./endpoints";
import HTTP, {
  generateBearer,
  generateMultipartHeader,
  mergeHeaders
} from "utils/http";
import { UserStorage } from "storage";

export default class TableApi {
  static purchaseTableOnline = async ({
    totalTable,
    amount,
    paystackRef,
    token = UserStorage.token
  }) => {
    return HTTP.post(
      ENDPOINTS.TABLE_PURCHASE_ONLINE,
      { total_tables: totalTable, amount, paystack_ref: paystackRef },
      generateBearer(token)
    );
  };

  static purchaseTableOffline = async ({
    evidence,
    reference,
    amount,
    token = UserStorage.token
  }) => {
    const formData = new FormData();
    formData.append("evidence", evidence);
    formData.append("reference", reference);
    formData.append("amount", amount);
    return HTTP.post(
      ENDPOINTS.TABLE_PURCHASE_OFFLINE,
      formData,
      mergeHeaders(generateBearer(token), generateMultipartHeader())
    );
  };
}
