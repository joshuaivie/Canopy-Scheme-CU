'use strict';

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use('Server');
const Kue = require('kue');
const Env = use('Env');
const Config = use('Config');

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware = ['Adonis/Middleware/BodyParser', 'App/Middleware/ConvertEmptyStringsToNull'];

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
  auth: 'Adonis/Middleware/Auth',
  isUserGroupOwner: 'App/Middleware/IsUserGroupOwner',
  notInUserGroup: 'App/Middleware/NotInUserGroup',
  inUserGroup: 'App/Middleware/InUserGroup',
  isValidGroupInviteLink: 'App/Middleware/IsValidGroupInviteLink'
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
  'Adonis/Middleware/Static',
  'Adonis/Middleware/Cors'
];

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);

Kue.createQueue({
  redis: `redis://${Config.get('redis.redis.host')}:${Config.get('redis.redis.port')}`,
  prefix: Env.get('APP_NAME', 'canopy-scheme')
});

Kue.app.listen(Env.get('KUE_UI_PORT', 3050));
