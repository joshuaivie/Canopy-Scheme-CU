class MoneyHelper {
  static nairaToKobo(naira) {
    return naira * 100;
  }

  static koboToNaira(kobo) {
    return kobo / 100;
  }
}

module.exports = MoneyHelper;
