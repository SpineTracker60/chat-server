import RoomModel from "../models/room";

exports.create = async (memberId) => {
  const room = new RoomModel({
    member: memberId,
  });
  const newRoom = await room.save();
  return { success: true, body: newRoom };
};

exports.findByMemberId = async (memberId) => {
  const room = await RoomModel.findOne({ member: memberId });
  return room;
};
