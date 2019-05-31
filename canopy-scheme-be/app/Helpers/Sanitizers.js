const { capitalizeFirstLetter } = use("App/Helpers/Stringify");

class Sanitize {
  static reduceError(errorMessages) {
    let errorMsg = {};
    errorMessages.map(x => {
      errorMsg[x.field] = capitalizeFirstLetter(x.message);
    });

    return { errors: errorMsg };
  }
}

module.exports = Sanitize;
