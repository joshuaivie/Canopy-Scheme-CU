import * as ENDPOINTS from "./endpoints";
import { HTTP, generateBearer } from "../../utils/fetch";

export default class TableApi {
  static pay = async token => {
    return HTTP.get(ENDPOINTS.TABLE_PAY, generateBearer(token));
  };
}
