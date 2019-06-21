"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RemoveLinkExpiringDateFromEventInfosSchema extends Schema {
  up() {
    this.table("event_infos", table => {
      table.dropColumn("invite_link_hours_valid");
    });
  }

  down() {
    this.table("event_infos", table => {
      table
        .integer("invite_link_hours_valid")
        .notNullable()
        .default(24);
    });
  }
}

module.exports = RemoveLinkExpiringDateFromEventInfosSchema;
