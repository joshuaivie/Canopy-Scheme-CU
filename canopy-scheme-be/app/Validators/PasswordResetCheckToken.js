"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class PasswordResetCheckToken extends BaseValidator {
  get rules() {
    return {
      password: "required|min:8",
      password_confirm: "required|min:8"
    };
  }

  get messages() {
    return {
      min: "Password must not be less than 8 characters long.",
      required: "{{ field }} is required."
    };
  }
}

module.exports = PasswordResetCheckToken;
