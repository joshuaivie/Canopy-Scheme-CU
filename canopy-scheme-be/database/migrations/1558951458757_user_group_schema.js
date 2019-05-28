'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserGroupSchema extends Schema {
  up() {
    this.create('user_groups', table => {
      table.increments();
      table.string('name', 100).notNullable().unique();
      table.string('token', 16).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().unique(); // this is the owner of the group
      table.timestamps();
    });
  }

  down() {
    this.drop('user_groups');
  }
}

module.exports = UserGroupSchema;
