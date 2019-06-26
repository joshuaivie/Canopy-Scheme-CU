"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RenameUsernameFieldToEmailForAdminSchema extends Schema {
  up() {
    this.table("admins", table => {
      table.renameColumn("username", "email");
    });
  }

  down() {
    this.table("admins", table => {
      table.renameColumn("email", "username");
    });
  }
}

module.exports = RenameUsernameFieldToEmailForAdminSchema;
