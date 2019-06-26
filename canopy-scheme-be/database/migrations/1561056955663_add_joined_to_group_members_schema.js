"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddJoinedToGroupMembersSchema extends Schema {
  up() {
    this.table("user_group_members", table => {
      table
        .boolean("joined")
        .notNullable()
        .default(false);
    });
  }

  down() {
    this.table("user_group_members", table => {
      table.dropColumn("joined");
    });
  }
}

module.exports = AddJoinedToGroupMembersSchema;
