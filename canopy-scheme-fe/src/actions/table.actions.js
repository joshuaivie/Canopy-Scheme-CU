import { TableApi } from "services/backendApi";
import { errorAlert } from "utils/notification";
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
      errorAlert(err.msg);
      throw err;
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
      errorAlert(err.msg);
      throw err;
    }
  }
}

export default TableAction;
