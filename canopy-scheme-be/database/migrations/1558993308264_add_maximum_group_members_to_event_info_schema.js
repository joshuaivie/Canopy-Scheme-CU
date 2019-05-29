"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddMaximumGroupMembersToEventInfoSchema extends Schema {
  up() {
    this.table("event_infos", table => {
      table
        .integer("maximum_group_members")
        .notNullable()
        .default(4);
    });
  }

  down() {
    this.table("event_infos", table => {
      table.dropColumn("maximum_group_members");
    });
  }
}

module.exports = AddMaximumGroupMembersToEventInfoSchema;
