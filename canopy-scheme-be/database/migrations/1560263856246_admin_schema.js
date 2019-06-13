"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdminSchema extends Schema {
  up() {
    this.create("admins", table => {
      table.increments();
      table
        .string("username", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("firstname", 200).notNullable();
      table.string("lastname", 200).notNullable();
      table.timestamps();
    });

    this.alter("tokens", table => {
      table
        .integer("admin_id")
        .unsigned()
        .references("id")
        .inTable("admins");
    });
  }

  down() {
    this.table("tokens", table => {
      table.dropForeign("admin_id");
      table.dropColumn("admin_id");
    });
    this.drop("admins");
  }
}

module.exports = AdminSchema;
