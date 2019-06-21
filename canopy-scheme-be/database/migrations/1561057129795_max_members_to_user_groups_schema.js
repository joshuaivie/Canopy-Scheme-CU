"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MaxMembersToUserGroupsSchema extends Schema {
  up() {
    this.table("user_groups", table => {
      table
        .integer("maximum_group_members")
        .notNullable()
        .default(4);
    });
  }

  down() {
    this.table("user_groups", table => {
      table.dropColumn("maximum_group_members");
    });
  }
}

module.exports = MaxMembersToUserGroupsSchema;
