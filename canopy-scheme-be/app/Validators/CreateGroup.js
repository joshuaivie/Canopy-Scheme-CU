"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class CreateGroup extends BaseValidator {
  get rules() {
    return {
      name: "required|unique:user_groups,name"
    };
  }

  get messages() {
    return {
      "name.unique": "The specified group name already exists."
    };
  }
}

module.exports = CreateGroup;
