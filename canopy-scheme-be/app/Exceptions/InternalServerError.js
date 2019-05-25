'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

class InternalServerError extends LogicalException {
  handle(error, { response }) {
    return response.status(500).json({ message: 'Internal Server Error.' });
  }
}

module.exports = InternalServerError;
