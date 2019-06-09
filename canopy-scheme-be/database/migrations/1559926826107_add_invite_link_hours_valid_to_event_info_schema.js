"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddInviteLinkHoursValidToEventInfoSchema extends Schema {
  up() {
    this.table("event_infos", table => {
      table
        .integer("invite_link_hours_valid")
        .notNullable()
        .default(24);
    });
  }

  down() {
    this.table("event_infos", table => {
      table.dropColumn("invite_link_hours_valid");
    });
  }
}

module.exports = AddInviteLinkHoursValidToEventInfoSchema;
