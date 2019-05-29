"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserGroup extends Model {
  static get hidden() {
    return ["user_id"];
  }

  members() {
    return this.hasMany("App/Models/UserGroupMember");
  }
}

module.exports = UserGroup;
