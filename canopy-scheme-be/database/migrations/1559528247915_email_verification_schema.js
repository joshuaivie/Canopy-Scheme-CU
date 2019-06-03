"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EmailVerificationSchema extends Schema {
  up() {
    this.create("email_verifications", table => {
      table.increments();
      table.string("email");
      table.string("token");
      table.timestamps();
    });
  }

  down() {
    this.drop("email_verifications");
  }
}

module.exports = EmailVerificationSchema;
