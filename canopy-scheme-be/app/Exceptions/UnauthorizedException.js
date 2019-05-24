'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

class UnauthorizedException extends LogicalException {
  handle(error, { response }) {
    return response.status(401).json({ msg: error.message });
  }
}

module.exports = UnauthorizedException;
