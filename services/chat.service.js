import ChatModel from "../models/chat";
import roomService from "../services/room.service";

exports.create = async (chatDTO) => {
  const room = await roomService.findByMemberId(chatDTO.memberId);
  const chat = new ChatModel({
    sender_member: chatDTO.memberId,
    tag: chatDTO.chatTag,
    body: chatDTO.chat,
    room: room._id.toString(),
  });
  const newChat = await chat.save();
  return { success: true, body: newChat };
};
