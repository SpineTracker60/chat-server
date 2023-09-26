import httpStatus from "http-status-codes";
import { create, requestUserInfo, requestUnstablePosture, requestChatBot } from "../services/chat.service";

exports.create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const chat = req.body.chat;
  const chatTag = req.body.chatTag;
  const io = await req.app.get("io");
  const results = await create(io, { memberId, chat, chatTag });
  const userInfo = await requestUserInfo(memberId);
  const unStableRatio = await requestUnstablePosture(memberId);
  const chatbotResults = await requestChatBot(io, results.newChat, userInfo ? userInfo : { birth_date: new Date().toISOString().split("T")[0], gender: "MALE", job: "student" }, unStableRatio ? unStableRatio : { turtle_neck: 0.0, sleepiness: 0.0, asymmetry: 0.0, stooped_position: 0.0 });

  let status = httpStatus.CREATED;
  const result = {
    status: status,
    body: {
      results,
      chatbotResults,
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
