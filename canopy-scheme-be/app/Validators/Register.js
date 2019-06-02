"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class Register extends BaseValidator {
  get rules() {
    return {
      email: "required|unique:users,email",
      matric_no: "required|valid_matric_no|unique:users,matric_no",
      password: "required|min:8",
      firstname: "required|string|min:3|max:200",
      lastname: "required|string|min:3|max:200",
      telephone_no: "required|unique:users,telephone_no|string|min:8|max:14"
    };
  }

  get sanitizationRules() {
    return {
      email: "normalize_email",
      matric_no: "lowercase"
    };
  }

  get messages() {
    return {
      "password.min": "Password must not be less than 8 characters long.",
      required: "{{ field }} is required to register.",
      unique: "This {{ field }} has already been registered.",
      "telephone_no.min": "Your phone number is invalid.",
      "telephone_no.max": "Your phone number is invalid.",
      "matric_no.valid_matric_no":
        "This matric number is not valid for this platform"
    };
  }
}

module.exports = Register;
