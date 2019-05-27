'use strict';

const BaseValidator = use('App/Validators/BaseValidator');

class Register extends BaseValidator {
  get rules() {
    return {
      email: 'required|unique:users,email',
      matric_no: 'required|unique:users,matric_no',
      password: 'required|min:8',
      firstname: 'required|string|min:3|max:200',
      lastname: 'required|string|min:3|max:200',
      telephone_no: 'required|string|min:8|max:14'
    };
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    };
  }

  get messages() {
    return {
      'password.min': 'Password must not be less than 8 characters long.'
    };
  }
}

module.exports = Register;
