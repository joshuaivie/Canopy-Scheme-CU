"use strict";

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use("Server");
var kue = require("kue");
const Env = use("Env");
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
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Route.get().middleware('auth')
|
*/
const namedMiddleware = {
  auth: "Adonis/Middleware/Auth",
  guest: "Adonis/Middleware/AllowGuestOnly"
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
const serverMiddleware = [
  // 'Adonis/Middleware/Static',
  "Adonis/Middleware/Cors"
];

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);

kue.createQueue({
  redis: Env.get("REDIS_URL", "redis://127.0.0.1:6379"),
  prefix: Env.get("APP_NAME", "canopy-scheme")
});

kue.app.listen(Env.get("KUE_UI_PORT", 3050));
