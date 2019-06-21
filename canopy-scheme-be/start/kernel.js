"use strict";

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use("Server");

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware = [
  "Adonis/Middleware/BodyParser",
  "App/Middleware/ConvertEmptyStringsToNull"
];

/*
|--------------------------------------------------------------------------
| Named Middleware
|--------------------------------------------------------------------------
|
| Named middleware is key/value object to conditionally add middleware on
| specific routes or group of routes.
|
|
*/
const namedMiddleware = {
  auth: "Adonis/Middleware/Auth",
  isUserGroupOwner: "App/Middleware/IsUserGroupOwner",
  notInUserGroup: "App/Middleware/NotInUserGroup",
  inviteeNotInUserGroup: "App/Middleware/InviteeNotInUserGroup",
  inUserGroup: "App/Middleware/InUserGroup",
  isValidGroupInviteLink: "App/Middleware/IsValidGroupInviteLink",
  verifyEmail: "App/Middleware/VerifyEmail",
  isOfflineTransactionOwner: "App/Middleware/IsOfflineTransactionOwner",
  hasVerifiedPayment: "App/Middleware/HasVerifiedPayment"
};

/*
|--------------------------------------------------------------------------
| Server Middleware
|--------------------------------------------------------------------------
|
| Server level middleware are executed even when route for a given URL is
| not registered. Features like `static assets` and `cors` needs better
| control over request lifecycle.
|
*/
const serverMiddleware = ["Adonis/Middleware/Static", "Adonis/Middleware/Cors"];

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);
