import httpStatus from "http-status-codes";
import chatService from "../services/chat.service";

exports.create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const chat = req.body.chat;
  const chatTag = req.body.chatTag;
  const io = await req.app.get("io");
  const results = await chatService.create(io, { memberId, chat, chatTag });
  const requestChatBot = await chatService.requestChatBot(
    io,
    results.newChat,
    {
      age: 27,
      gender: 1,
      job: 7,
    },
    {
      turtle_neck: 0.5,
      sleepiness: 0.2,
      stooped_position: 0.9,
    }
  );

  let status = httpStatus.CREATED;
  const result = {
    status: status,
    body: {
      results,
      requestChatBot,
    },
  };
  res.status(status).json(result);
};

exports.findByRoomId = async (req, res, next) => {
  const roomId = req.query.roomId;
  const results = await chatService.findByRoomId(roomId);
  let status = httpStatus.OK;
  const result = {
    status: status,
    body: {
      results,
    },
  };
  res.status(status).json(result);
};
