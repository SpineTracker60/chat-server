import express from "express";

const router = express.Router();

// custom utils And middlewares
import * as chatController from "../controllers/chat.controller";

router.post("/", chatController.create);
router.get("/", chatController.findByRoomId);
export default router;
