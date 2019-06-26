/* eslint-disable import/prefer-default-export */
import { UserStorage } from "storage";

export function isLoggedIn() {
  const { token, refreshToken } = UserStorage;
  return token != null && refreshToken != null;
}

export function isGroupOwner() {
  if (!isLoggedIn()) return false;
  const { userInfo } = UserStorage;
  return userInfo.is_group_owner === true;
}
