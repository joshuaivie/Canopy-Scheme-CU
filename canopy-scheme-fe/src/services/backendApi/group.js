import HTTP, { generateBearer } from "utils/http";
import * as ENDPOINTS from "./endpoints";
import { UserStorage } from "storage";

export default class GroupApi {
  /**
   * Create a user group.
   */
  static createGroup = async ({ name, token = UserStorage.token }) => {
    return HTTP.post(ENDPOINTS.GROUP, { name }, generateBearer(token));
  };

  /**
   * Performs a invite user request.
   */
  static inviteUsers = async ({ users, token = UserStorage.token }) => {
    return HTTP.post(ENDPOINTS.GROUP_INVITE, { users }, generateBearer(token));
  };

  /**
   * Join a group.
   */
  static joinGroup = async ({ groupId, groupToken, inviteeEmail, expiringDate }) => {
    return HTTP.get(
      ENDPOINTS.GROUP_JOIN({
        groupId,
        groupToken,
        inviteeEmail,
        expiringDate
      })
    );
  };
}
