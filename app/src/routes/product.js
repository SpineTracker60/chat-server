import express from "express";

const router = express.Router();

// custom utils And middlewares
import * as productController from "../controllers/product.controller";

router.post("/coupang", productController.coupang);
export default router;
