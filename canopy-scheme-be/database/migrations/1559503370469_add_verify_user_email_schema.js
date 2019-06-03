"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddVerifyUserEmailSchema extends Schema {
  up() {
    this.table("users", table => {
      table.boolean("email_verified").defaultTo(false);
    });
  }

  down() {
    this.table("users", table => {
      table.dropColumn("email_verified");
    });
  }
}

module.exports = AddVerifyUserEmailSchema;
