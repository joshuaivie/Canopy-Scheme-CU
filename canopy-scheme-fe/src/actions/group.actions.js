import { GroupApi } from "services/backendApi";
import { errorAlert } from "utils/notification";
import { UserStorage } from "storage";

class GroupActions {
  static async createGroup({ name, token = UserStorage.token }) {
    try {
      await GroupApi.createGroup({ name, token });
    } catch (err) {
      errorAlert(err.msg);
      throw err;
    }
  }

  static async inviteUser({ users, token = UserStorage.token }) {
    try {
      const response = await GroupApi.inviteUsers({ users, token });
      return response.data;
    } catch (err) {
      errorAlert(err.response.data.errors.map(x => x.message));
      throw err;
    }
  }
}

export default GroupActions;
