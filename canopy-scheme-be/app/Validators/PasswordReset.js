"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class PasswordReset extends BaseValidator {
  get rules() {
    return {
      email: "required|email"
    };
  }

  get sanitizationRules() {
    return {
      email: "normalize_email"
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required."
    };
  }
}

module.exports = PasswordReset;
