const { reduceError } = use('App/Helpers/Sanitizers');

class BaseValidator {
  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.send(reduceError(errorMessages));
  }
}

module.exports = BaseValidator;
