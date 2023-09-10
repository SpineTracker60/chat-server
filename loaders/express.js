import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import compression from "compression";
// custom utils And middlewares
import morgan from "morgan";
import logger from "../libs/log/winston";
import morganFormat from "../libs/log/index";
import jsonResult from "../middlewares/jsonResult";

// application Controllers for Routes
import { pageNotFoundError, respondInternalError } from "../controller/error.controller";

export default async (app) => {
  app.set("trust proxy", true);
  app.use(cors({ credentials: true, origin: true, exposedHeaders: ["cookie"] }));
  app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  app.use(compression());
  app.use(morgan(morganFormat.dev, { stream: logger.stream }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), "public")));
  // custom middlewares
  app.use(jsonResult);
  // application routes
  // custom Error controllers
  app.use(pageNotFoundError);
  app.use(respondInternalError);

  return app;
};
