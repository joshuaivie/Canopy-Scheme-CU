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

  static async maximumGroupMembers() {
    const event = await EventInfoModel.first();
    if (event === null) return 4;
    return event.maximum_group_members;
  }

  static async noOfHoursInviteLinkIsValid() {
    const event = await EventInfoModel.first();
    if (event === null) return 12;
    return event.invite_link_hours_valid;
  }
}

module.exports = EventInfo;
