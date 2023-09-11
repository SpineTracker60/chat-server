import express from "express";

const router = express.Router();

// custom utils And middlewares
import * as roomController from "../controllers/room.controller";

router.post("/", roomController.create);
export default router;
