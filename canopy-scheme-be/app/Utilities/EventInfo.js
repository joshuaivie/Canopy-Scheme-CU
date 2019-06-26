const EventInfoModel = use("App/Models/EventInfo");

class EventInfo {
  static async totalTables() {
    const event = await EventInfoModel.first();
    if (event === null) return 960;
    return event.total_tables;
  }

  static async unitPrice() {
    const event = await EventInfoModel.first();
    if (event === null) return 12000;
    return event.table_unit_price;
  }

  static async tablesBooked() {
    const event = await EventInfoModel.first();
    if (event === null) return 0;
    return event.tables_booked;
  }

  static async tablesLeft() {
    const event = await EventInfoModel.first();
    if (event === null) return 0;
    return event.total_tables - event.tables_booked;
  }
}

module.exports = EventInfo;
