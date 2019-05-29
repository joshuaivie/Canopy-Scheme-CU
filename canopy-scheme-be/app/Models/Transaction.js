"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Transaction extends Model {
  static get hidden() {
    return ["id", "user_id"];
  }

  user() {
    return this.belongsTo("App/Model/User");
  }
}

module.exports = Transaction;
