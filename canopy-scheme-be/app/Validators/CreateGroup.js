"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class CreateGroup extends BaseValidator {
  get rules() {
    return {
      name: "required|unique:user_groups,name|min:5"
    };
  }

  get messages() {
    return {
      "name.unique": "The specified group name already exists.",
      "name.required": "Group name is required.",
      "name.min": "Group name must be at least 5 characters."
    };
  }
}

module.exports = CreateGroup;
