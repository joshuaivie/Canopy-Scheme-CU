"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentInfoSchema extends Schema {
  up() {
    this.create("student_infos", table => {
      table.increments();
      table
        .string("matric_no", 11)
        .notNullable()
        .unique();
      table.string("college", 10).notNullable();
      table.string("department", 254).notNullable();
      table.string("program", 254).notNullable();
      table.string("student_name", 254).notNullable();
      table.integer("level").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("student_infos");
  }
}

module.exports = StudentInfoSchema;
