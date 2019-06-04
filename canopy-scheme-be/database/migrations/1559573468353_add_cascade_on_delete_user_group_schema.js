"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddCascadeOnDeleteUserGroupSchema extends Schema {
  up() {
    this.alter("user_group_members", table => {
      table.dropForeign("user_group_id");
      table
        .integer("user_group_id")
        .unsigned()
        .references("id")
        .inTable("user_groups")
        .notNullable()
        .onDelete("CASCADE")
        .alter();
    });
  }

  down() {
    this.table("user_group_members", table => {
      // reverse alternations
    });
  }
}

module.exports = AddCascadeOnDeleteUserGroupSchema;
