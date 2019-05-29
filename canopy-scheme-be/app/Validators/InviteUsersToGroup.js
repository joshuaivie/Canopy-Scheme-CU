'use strict';

const BaseValidator = use('App/Validators/BaseValidator');

class InviteUsersToGroup extends BaseValidator {
  get rules() {
    return {
      users: 'required|array|min:1|max:5'
    };
  }
}

module.exports = InviteUsersToGroup;
