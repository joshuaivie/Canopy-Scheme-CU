class MoneyHelper {
  static nairaToKobo(amount) {
    return amount * 100;
  }

  static koboToNaira(amount) {
    return amount / 100;
  }
}

module.exports = MoneyHelper;
