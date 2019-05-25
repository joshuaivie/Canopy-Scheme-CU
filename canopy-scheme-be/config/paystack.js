'use strict';

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  secretKey: Env.get('PAYSTACK_SECRET_KEY', 'pk_secret_')
};
