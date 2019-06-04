// Authentication
export const REGISTER = `/register`;
export const LOGIN = `/login`;
export const LOGOUT = `/logout`;

// User
export const USER = `/me`;
export const USER_TRANSACTIONS = `${USER}/transactions`;
export const USER_RESERVATIONS = `${USER}/reservations`;
export const USER_GROUP = `${USER}/group`;
export const USER_GROUP_LEAVE = `${USER}/group/leave`;
export const REMOVE_GROUP_MEMBER = matricNo =>
  `${USER}/group/member/${matricNo}/remove`;

// Group
export const GROUP = "/group";
export const GROUP_INVITE = `${GROUP}/invite`;

// Table
export const TABLE = `/table`;
export const TABLE_PURCHASE = `${TABLE}/purchase`;
