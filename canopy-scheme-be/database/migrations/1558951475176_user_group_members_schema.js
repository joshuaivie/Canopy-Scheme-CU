'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGroupMembersSchema extends Schema {
  up () {
    this.create('user_group_members', (table) => {
      table.increments()
      table.integer('user_group_id').unsigned().references('id').inTable('user_groups').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().unique();
      table.timestamps()
    })
  }

  down () {
    this.drop('user_group_members')
  }
}

module.exports = UserGroupMembersSchema
