import express from "express";

const router = express.Router();

// custom utils And middlewares
import * as roomController from "../controllers/room.controller";

router.post("/", roomController.create);
router.get("/", roomController.findRoomIdByMemberId);
export default router;
