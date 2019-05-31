/* eslint-disable import/prefer-default-export */
import { UserStorage } from "../storage";

export function isLoggedIn() {
  const { token, refreshToken, userInfo } = UserStorage;

  return token != null && refreshToken != null && userInfo != null;
}
