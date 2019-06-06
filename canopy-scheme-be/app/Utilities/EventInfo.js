const EventInfoModel = use("App/Models/EventInfo");

class EventInfo {
  static async totalChairs() {
    const event = await EventInfoModel.first();
    if (event === null) return 960;
    return event.total_tables;
  }

  static async unitPrice() {
    const event = await EventInfoModel.first();
    if (event === null) return 10000;
    return event.table_unit_price;
  }

  static async maximumGroupMembers() {
    const event = await EventInfoModel.first();
    if (event === null) return 4;
    return event.maximum_group_members;
  }
}

module.exports = EventInfo;
