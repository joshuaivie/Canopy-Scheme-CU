'use strict';

const BaseValidator = use('App/Validators/BaseValidator');

class Login extends BaseValidator {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    };
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    };
  }
}

module.exports = Login;
