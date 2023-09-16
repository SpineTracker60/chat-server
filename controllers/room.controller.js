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
  let status = httpStatus.OK;
  const result = {
    status: status,
    body: {
      roomId: room._id.toString(),
    },
  };
  res.status(status).json(result);
};
