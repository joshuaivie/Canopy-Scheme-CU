"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  // Authentication
  Route.post("auth/:authenticator/login", "AuthController.login").validator(
    "Login"
  );
  Route.post("auth/user/register", "AuthController.register").validator(
    "Register"
  );

  // Reset and Verification
  Route.post(
    "password/reset",
    "AuthController.sendResetPasswordLink"
  ).validator("PasswordReset");
  Route.get("verification/email/:token", "UserController.verifyEmail").as(
    "email.verify"
  );
  Route.post("password/reset/:email_token", "AuthController.resetPassword")
    .validator("PasswordResetCheckToken")
    .as("password.reset-token");
  Route.get(
    "group/join/:group_id/:token/:invitee_email/:expiring_date",
    "GroupController.join"
  )
    .middleware(["inviteeNotInUserGroup", "isValidGroupInviteLink"])
    .as("group.join");
}).prefix("api");

Route.group(() => {
  // Payment
  Route.post(
    "table/purchase/online",
    "OnlinePaymentController.purchaseTable"
  ).validator("PayForTableOnline");
  Route.post(
    "table/purchase/offline",
    "OfflinePaymentController.purchaseTable"
  ).validator("PayForTableOffline");

  // User
  Route.get("me/transactions", "UserController.transactions");

  // User Reservations
  Route.get("me/reservations", "UserController.reservations");

  // User Group
  Route.get("me/group", "UserController.getGroup").middleware([
    "hasVerifiedPayment",
    "inUserGroup"
  ]);
  Route.delete("me/group", "UserController.deleteGroup").middleware([
    "hasVerifiedPayment",
    "isUserGroupOwner"
  ]);
  Route.delete("me/group/leave", "UserController.leaveGroup").middleware([
    "hasVerifiedPayment",
    "inUserGroup"
  ]);
  Route.delete(
    "me/group/member/:matric_no/remove",
    "UserController.removeGroupMember"
  ).middleware(["hasVerifiedPayment", "inUserGroup"]);

  // Group
  Route.post("group", "GroupController.create")
    .validator("CreateGroup")
    .middleware("hasVerifiedPayment")
    .middleware("notInUserGroup");
  Route.post("group/invite", "GroupController.invite")
    .validator("InviteUsersToGroup")
    .middleware("hasVerifiedPayment")
    .middleware("isUserGroupOwner");
})
  .prefix("api")
  .middleware(["auth:user", "verifyEmail"]);

Route.group(() => {
  Route.get("me", "UserController.profile");
  Route.get(
    "verification/resend/email",
    "UserController.resendEmailVerificationLink"
  );
  Route.post("password/change", "UserController.changePassword").validator(
    "ChangePassword"
  );
  Route.post(
    "token/:authenticator/refresh",
    "AuthController.refreshToken"
  ).validator("RequestToken");
  Route.post(
    "token/:authenticator/refresh",
    "AuthController.refreshToken"
  ).validator("RequestToken");
  Route.post("logout", "AuthController.logout").validator("RequestToken");
})
  .prefix("api")
  .middleware("auth");

Route.group(() => {
  Route.get(
    "transactions/offline/page/:page/limit/:limit/statusType/:statusType",
    "OfflinePaymentController.getAll"
  );
  Route.get(
    "transactions/online/page/:page/limit/:limit",
    "OnlinePaymentController.getAll"
  );
  Route.put(
    "transactions/offline/:reference",
    "OfflinePaymentController.update"
  ).validator("UpdateOfflineTransaction");
})
  .prefix("api")
  .middleware("auth:admin");
