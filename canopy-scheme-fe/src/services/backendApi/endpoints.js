const APPEND_API = "api";
// Authentication
export const REGISTER = `${APPEND_API}/register`;
export const LOGIN = `${APPEND_API}/login`;
export const LOGOUT = `${APPEND_API}/logout`;

// RESET PASSWORD
export const RESET_PASSWORD = `${APPEND_API}/password/reset`;

// User
export const USER = `${APPEND_API}/me`;
export const USER_TRANSACTIONS = `${USER}/transactions`;
export const USER_RESERVATIONS = `${USER}/reservations`;
export const USER_GROUP = `${USER}/group`;
export const USER_GROUP_LEAVE = `${USER}/group/leave`;
export const VERIFY_EMAIL = emailToken => `/verification/email/${emailToken}`;
export const REMOVE_GROUP_MEMBER = matricNo =>
  `${USER}/group/member/${matricNo}/remove`;

// Group
export const GROUP = `${APPEND_API}/group`;
export const GROUP_INVITE = `${GROUP}/invite`;
export const JOIN_GROUP = ({ groupId, groupToken, inviteeEmail }) =>
  `${GROUP}/join/${groupId}/${groupToken}/${inviteeEmail}`;

// Table
export const TABLE = `${APPEND_API}/table`;
export const TABLE_PURCHASE = `${TABLE}/purchase`;
