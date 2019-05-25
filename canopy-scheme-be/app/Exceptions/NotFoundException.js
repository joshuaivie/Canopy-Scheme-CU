'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

class NotFoundException extends LogicalException {
  handle(error, { response }) {
    return response.status(404).json({ msg: error.message });
  }
}

module.exports = NotFoundException;
