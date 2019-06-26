const { createLogger } = require("winston");
const { SQLTransport } = require("winston-sql-transport");

class MysqlLogger {
  setConfig(config) {
    const { connection, ...extraConfig } = config;
    this.config = Object.assign({}, { connection }, extraConfig);
    this.logger = createLogger({
      transports: [new SQLTransport(this.config)]
    });

    this.logger.setLevels(this.levels);
  }

  /**
   * The levels to be used by winston
   *
   * @method levels
   *
   * @return {Object}
   */
  get levels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    };
  }

  /**
   * Returns the current level for the driver
   *
   * @attribute level
   *
   * @return {String}
   */
  get level() {
    return this.logger.transports[this.config.name].level;
  }

  /**
   * Update driver log level at runtime
   *
   * @param  {String} level
   *
   * @return {void}
   */
  set level(level) {
    this.logger.transports[this.config.name].level = level;
  }

  /**
   * Log message
   *
   * @method log
   *
   * @param  {Number}    level
   * @param  {String}    msg
   * @param  {...Spread} meta
   *
   * @return {void}
   */
  log(level, msg, ...meta) {
    const levelName = Object.keys(this.levels).filter(
      key => this.levels[key] === level
    );
    this.logger.log(levelName, msg, ...meta);
  }
}

module.exports = MysqlLogger;
