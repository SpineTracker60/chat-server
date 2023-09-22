import RoomModel from "../models/room";

exports.create = async (memberId) => {
  try {
    if (parseInt(memberId) === 0) {
      await RoomModel.findOneAndDelete({ member: memberId });
    }
    const room = new RoomModel({
      member: memberId,
    });
    const newRoom = await room.save();

    return newRoom;
  } catch (e) {
    return { success: false, body: { error: e } };
  }
};

exports.findByMemberId = async (memberId) => {
  const room = await RoomModel.findOne({ member: memberId });
  return room;
};
