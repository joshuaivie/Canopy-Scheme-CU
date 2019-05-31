import { TableApi } from "../services/backendApi";
import { errorAlert } from "../utils/notification";
import { UserStorage } from "../storage";

class TableActions {
  static async pay({ amount, totalTables, paystackRef, token = UserStorage.token }) {
    try {
      await TableApi.purchaseTable({ amount, totalTables, paystackRef, token });
    } catch (err) {
      errorAlert(err.msg);
      throw err;
    }
  }
}

export default TableActions;
