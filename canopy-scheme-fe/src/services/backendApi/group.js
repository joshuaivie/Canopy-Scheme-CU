import { HTTP, generateBearer } from "../../helpers/http";
import * as ENDPOINTS from "./endpoints";

export default class GroupApi {
  /**
   * Performs a login request to backend.
   */
  static create = async ({ name, token }) => {
    return HTTP.post(ENDPOINTS.GROUP, { name }, generateBearer(token));
  };

  /**
   * Performs a registration request to backend.
   */
  static invite = async ({ users, token }) => {
    return HTTP.post(ENDPOINTS.GROUP_INVITE, { users }, generateBearer(token));
  };
}
