import httpStatus from "http-status-codes";
import chatService from "../services/chat.service";

exports.create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const chat = req.body.chat;
  const chatTag = req.body.chatTag;
  const results = await chatService.create({ memberId, chat, chatTag });

  let status = httpStatus.CREATED;
  const result = {
    status: status,
    body: {
      results,
    },
  };
  res.status(status).json(result);
};
