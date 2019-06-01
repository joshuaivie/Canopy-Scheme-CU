import HTTP, { generateBearer } from "../../utils/http";
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
}
