"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class ChangePassword extends BaseValidator {
  get rules() {
    return {
      old_password: "required",
      new_password: "required|min:8",
      new_password_confirm: "required|min:8"
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required.",
      min: "Password must not be less than 8 characters long."
    };
  }
}

module.exports = ChangePassword;
