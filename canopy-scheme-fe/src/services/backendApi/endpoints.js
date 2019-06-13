// Authentication
export const REGISTER = "/auth/user/register";
export const USER_LOGIN = "/auth/user/login";
export const ADMIN_LOGIN = "/auth/admin/login";
export const LOGOUT = "/logout";

// RESET PASSWORD
export const RESET_PASSWORD = "/password/reset";

// User
export const USER = "/me";
export const USER_TRANSACTIONS = `${USER}/transactions`;
export const USER_RESERVATIONS = `${USER}/reservations`;
export const USER_GROUP = `${USER}/group`;
export const USER_GROUP_LEAVE = `${USER}/group/leave`;
export const VERIFY_EMAIL = emailToken => `/verification/email/${emailToken}`;
export const RESEND_EMAIL_VERIFICATION = "/verification/resend/email";
export const REMOVE_GROUP_MEMBER = matricNo =>
  `${USER}/group/member/${matricNo}/remove`;

// Group
export const GROUP = "/group";
export const GROUP_INVITE = `${GROUP}/invite`;
export const JOIN_GROUP = ({ groupId, groupToken, inviteeEmail, expiringDate }) =>
  `group/join/${groupId}/${groupToken}/${inviteeEmail}/${expiringDate}`;

// Table
export const TABLE = "/table";
export const TABLE_PURCHASE = `${TABLE}/purchase`;

// Change password
export const CHANGE_PASSWORD = "/password/change";

// Admin
const TRANSACTIONS = "/transactions";
export const ADMIN_GET_TRANSACTIONS = (page, limit) =>
  `${TRANSACTIONS}/offline/page/${page}/limit/${limit}`;
export const UPDATE_TRANSACTION = reference => `${TRANSACTIONS}/offline/${reference}`;
