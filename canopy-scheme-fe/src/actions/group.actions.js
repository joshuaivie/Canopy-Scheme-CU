import { GroupApi } from "services/backendApi";
import { UserStorage } from "storage";
import { resolveRequestError } from "utils/http";

class GroupActions {
  static async createGroup({ name, token = UserStorage.token }) {
    try {
      const response = await GroupApi.createGroup({ name, token });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async inviteUser({ users, token = UserStorage.token }) {
    try {
      const response = await GroupApi.inviteUsers({ users, token });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }

  static async joinGroup({ groupId, groupToken, inviteeEmail, expiringDate }) {
    try {
      const response = await GroupApi.joinGroup({
        groupId,
        groupToken,
        inviteeEmail,
        expiringDate
      });
      return response.data;
    } catch (err) {
      throw resolveRequestError(err);
    }
  }
}

export default GroupActions;
