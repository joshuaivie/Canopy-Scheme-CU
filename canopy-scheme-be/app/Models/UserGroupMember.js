'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class UserGroupMember extends Model {
  static get hidden() {
    return ['id'];
  }

  static get is_group_owner() {
    return false;
  }

  group() {
    return this.belongsTo('App/Models/UserGroup');
  }
}

module.exports = UserGroupMember;
