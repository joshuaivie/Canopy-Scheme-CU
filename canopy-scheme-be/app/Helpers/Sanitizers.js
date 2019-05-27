const { capitalizeFirstLetter } = use('App/Helpers/Stringify');

class Sanitize {
  static reduceError(errorMessages) {
    return errorMessages.map(x => {
      console.log(x);
      return { [x.field]: capitalizeFirstLetter(x.message) };
    });
  }
}

module.exports = Sanitize;
