import RoomModel from "../models/room";

exports.create = async (memberId) => {
  try {
    const room = new RoomModel({
      member: memberId,
    });
    const newRoom = await room.save();
    return { success: true, body: newRoom };
  } catch (e) {
    return { success: false, body: { error: e } };
  }
};

exports.findByMemberId = async (memberId) => {
  const room = await RoomModel.findOne({ member: memberId });
  return room;
};
