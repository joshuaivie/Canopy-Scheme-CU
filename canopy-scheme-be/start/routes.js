'use strict';

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
const Route = use('Route');

Route.group(() => {
  Route.post('login', 'AuthController.login').validator('Login');
  Route.post('register', 'AuthController.register').validator('Register');
}).prefix('api');

Route.group(() => {
  Route.post('token/refresh', 'AuthController.refreshToken').validator('RequestToken');
  Route.post('logout', 'AuthController.signout').validator('RequestToken');
})
  .prefix('api')
  .middleware('auth');
