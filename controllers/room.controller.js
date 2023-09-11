import httpStatus from "http-status-codes";
import roomService from "../services/room.service";

export const create = async (req, res, next) => {
  const memberId = req.query.memberId;
  const results = await roomService.create(memberId);

  let status = httpStatus.CREATED;
  const result = {
    status: status,
    body: {
      results,
    },
  };
  res.status(status).json(result);
};
