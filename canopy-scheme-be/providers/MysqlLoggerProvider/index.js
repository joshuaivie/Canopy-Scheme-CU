"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class MysqlLoggerProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.extend("Adonis/Src/Logger", "mysql", () => {
      const MysqlLogger = require("./MysqlLogger");
      return new MysqlLogger();
    });
  }
}

module.exports = MysqlLoggerProvider;
