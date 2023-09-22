import httpStatus from "http-status-codes";
import roomService from "../services/room.service";

exports.create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const results = await roomService.create(memberId);

  if (results) {
    let status = httpStatus.CREATED;
    const result = {
      status: status,
      body: { roomId: results._id.toString() },
    };
    res.status(status).json(result);
  } else {
    let status = httpStatus.NOT_FOUND;
    const result = {
      status: status,
      body: { message: "채팅방을 생성할 수  없습니다!" },
    };
    res.status(status).json(result);
  }
};

exports.findRoomIdByMemberId = async (req, res, next) => {
  const memberId = req.query.memberId;
  const room = await roomService.findByMemberId(memberId);
  let status;
  let body;
  if (room) {
    console.log(room);
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
