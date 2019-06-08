"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class CreateGroup extends BaseValidator {
  get rules() {
    return {
      name: "required|unique:user_groups,name|max:10"
    };
  }

  get messages() {
    return {
      "name.unique": "The specified group name already exists.",
      "name.required": "Group name is required.",
      "name.max": "Group name must be less than 11 characters."
    };
  }
}

module.exports = CreateGroup;
