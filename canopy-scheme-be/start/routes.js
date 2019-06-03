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
  Route.post("login", "AuthController.login").validator("Login");
  Route.post("register", "AuthController.register").validator("Register");
  Route.get("email-verification/:token", "UserController.verifyEmail").as(
    "email.verify"
  );
}).prefix("api");

Route.group(() => {
  Route.post("token/refresh", "AuthController.refreshToken").validator(
    "RequestToken"
  );
  Route.post("logout", "AuthController.signout").validator("RequestToken");

  // Payment
  Route.post("table/purchase", "PaymentController.purchaseTable").validator(
    "PayForTable"
  );

  // User
  Route.get("me", "UserController.profile");
  Route.get("me/transactions", "UserController.transactions");
  Route.get("me/reservations", "UserController.reservations");
  Route.get("me/group", "UserController.getGroup").middleware("inUserGroup");
  Route.delete("me/group", "UserController.deleteGroup").middleware(
    "isUserGroupOwner"
  );

  // Group
  Route.post("group", "GroupController.create")
    .validator("CreateGroup")
    .middleware("notInUserGroup");
  Route.post("group/invite", "GroupController.invite")
    .validator("InviteUsersToGroup")
    .middleware("isUserGroupOwner");
})
  .prefix("api")
  .middleware("auth");

Route.group(() => {
  Route.get(
    "group/join/:group_id/:token/:invitee_email",
    "GroupController.join"
  )
    .middleware("inviteeNotInUserGroup")
    .middleware("isValidGroupInviteLink")
    .as("group.join");
});
