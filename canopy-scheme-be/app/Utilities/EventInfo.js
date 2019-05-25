const EventInfoModle = use('App/Models/EventInfo');

class EventInfo {
  static async totalChairs() {
    const event = await EventInfoModle.first();
    if (event === null) return 960;
    return event.total_tables;
  }

  static async unitPrice() {
    const event = await EventInfoModle.first();
    if (event === null) return 15000;
    return event.table_unit_price;
  }
}

module.exports = EventInfo;
