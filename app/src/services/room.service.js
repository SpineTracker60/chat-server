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
    return { success: true, results: newRoom };
  } catch (err) {
    return { success: false, body: err };
  }
};

exports.findByMemberId = async (memberId) => {
  const room = await RoomModel.findOne({ member: memberId });
  return room;
};
