import RoomModel from "../models/room";

exports.create = async (memberId) => {
  const room = new RoomModel({
    member: memberId,
  });
  const newRoom = await room.save();
  return { success: true, body: newRoom };
};
