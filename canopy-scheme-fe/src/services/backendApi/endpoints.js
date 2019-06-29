// Authentication
export const REGISTER = "/auth/user/register";
export const USER_LOGIN = "/auth/user/login";
export const ADMIN_LOGIN = "/auth/admin/login";
export const LOGOUT = "/logout";

// RESET PASSWORD
export const PASSWORD = "/password";
export const PASSWORD_RESET = `${PASSWORD}/reset`;
export const PASSWORD_CHANGE = `${PASSWORD}/change`;

// User
export const USER = "/me";
export const USER_TRANSACTIONS = `${USER}/transactions`;
export const USER_RESERVATIONS = `${USER}/reservations`;
export const USER_GROUP = `${USER}/group`;
export const USER_GROUP_LEAVE = `${USER}/group/leave`;
export const USER_GROUP_MEMBER_REMOVE = (matricNo, deleteInvite) =>
  `${USER}/group/member/${matricNo}/remove?deleteInvite=${deleteInvite}`;

// Verification
export const VERIFY_EMAIL = emailToken => `/verification/email/${emailToken}`;
export const VERIFY_RESEND_EMAIL = "/verification/resend/email";

// Group
export const GROUP = "/group";
export const GROUP_INVITE = `${GROUP}/invite`;
export const GROUP_JOIN = ({ groupId, groupToken, inviteeEmail }) =>
  `${GROUP}/join/${groupId}/${groupToken}/${inviteeEmail}`;

// Table
export const TABLE = "/table";
export const TABLE_PURCHASE_ONLINE = `${TABLE}/purchase/online`;
export const TABLE_PURCHASE_OFFLINE = `${TABLE}/purchase/offline`;

// Admin
const TRANSACTIONS = "/transactions";
export const TRANSACTIONS_OFFLINE = (page, statusType, limit) =>
  `${TRANSACTIONS}/offline/page/${page}/limit/${limit}/statusType/${statusType}`;
export const TRANSACTIONS_UPDATE = `${TRANSACTIONS}/offline/update`;
