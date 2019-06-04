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

  owner() {
    return this.belongsTo("App/Models/User");
  }

  basicMembersInfo() {
    return this.members()
      .with("user", user => {
        return user.setVisible(["matric_no", "email", "firstname", "lastname"]);
      })
      .setVisible(["user"]);
  }
}

module.exports = UserGroup;
