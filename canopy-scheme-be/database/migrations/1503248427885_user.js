"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table
        .string("matric_no", 10)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("firstname", 200).notNullable();
      table.string("lastname", 200).notNullable();
      table.string("telephone_no", 20).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
