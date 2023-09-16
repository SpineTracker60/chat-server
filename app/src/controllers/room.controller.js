import httpStatus from "http-status-codes";
import roomService from "../services/room.service";

exports.create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const results = await roomService.create(memberId);

  let status = httpStatus.CREATED;
  const result = {
    status: status,
    body: results,
  };
  res.status(status).json(result);
};

exports.findRoomIdByMemberId = async (req, res, next) => {
  const memberId = req.query.memberId;
  const room = await roomService.findByMemberId(memberId);
  let status;
  let body;
  if (room) {
    status = httpStatus.OK;
    body = {
      roomId: room._id.toString(),
    };
  } else {
    status = httpStatus.NOT_FOUND;
    body = {
      message: "사용자 Id를 통해 채팅방을 찾을 수 없습니다!",
    };
  }
  const result = {
    status,
    body,
  };
  res.status(status).json(result);
};
