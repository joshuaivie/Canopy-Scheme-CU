import { TableApi } from "services/backendApi";
import { resolveRequestError } from "utils/http";
import { UserStorage } from "storage";

class TableAction {
  static async payOnline({
    amount,
    totalTable,
    paystackRef,
    token = UserStorage.token
  }) {
    try {
      const response = await TableApi.purchaseTableOnline({
        amount,
        totalTable,
        paystackRef,
        token
      });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async payOffline({ evidence, reference, amount, token = UserStorage.token }) {
    try {
      const response = await TableApi.purchaseTableOffline({
        evidence,
        amount,
        reference,
        token
      });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }
}

export default TableAction;
