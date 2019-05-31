import { HTTP, generateBearer } from "../../helpers/http";
import * as ENDPOINTS from "./endpoints";

export default class GroupApi {
  /**
   * Create a user group.
   */
  static createGroup = async ({ name, token }) => {
    return HTTP.post(ENDPOINTS.GROUP, { name }, generateBearer(token));
  };

  /**
   * Performs a invite user request.
   */
  static inviteUsers = async ({ users, token }) => {
    return HTTP.post(ENDPOINTS.GROUP_INVITE, { users }, generateBearer(token));
  };
}
