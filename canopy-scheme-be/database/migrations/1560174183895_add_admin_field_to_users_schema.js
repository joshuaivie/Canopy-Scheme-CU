"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddAdminFieldToUsersSchema extends Schema {
  up() {
    this.table("users", table => {
      table.boolean("is_admin").defaultTo(false);
    });
  }

  down() {
    this.table("users", table => {
      table.dropColumn("is_admin");
    });
  }
}

module.exports = AddAdminFieldToUsersSchema;
