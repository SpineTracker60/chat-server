import ChatModel from "../models/chat";
import roomService from "../services/room.service";

exports.create = async (io, chatDTO) => {
  const room = await roomService.findByMemberId(chatDTO.memberId);
  const roomId = room._id.toString();
  const chat = new ChatModel({
    sender_member: chatDTO.memberId,
    tag: chatDTO.chatTag,
    body: chatDTO.chat,
    room: roomId,
  });
  const newChat = await chat.save();
  io.of("/room").to(roomId).emit("chat", chat);
  return { success: true, newChat };
};

exports.findByRoomId = async (roomId) => {
  const chats = await ChatModel.find(
    {
      room: roomId,
    },
    {
      sender_member: true,
      tag: true,
      body: true,
      room: true,
      created_at: true,
    }
  );

  return { success: true, chats };
};
