import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export default async () => {
  const connect = async () => {
    if (process.env.NODE_ENV !== "production") mongoose.set("debug", true);
    console.log(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PROT}/${process.env.MONGO_DATABASE}?authSource=admin`);

    await mongoose
      .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PROT}/${process.env.MONGO_DATABASE}?authSource=admin`, {
        autoCreate: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("The MONGODB is connected"))
      .catch((err) => console.error("error.reason : ", err));

    mongoose.connection.on("error", (error) => {
      console.error("MONGODB connect error", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.error("MONGODB disconnect. try reconnect");
    });

    console.log("initialize Model Schema");
    fs.readdirSync(path.join(__dirname, "../models/"))
      .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
      .forEach((file) => {
        console.log("file", file);
        require(path.join(__dirname, "../models/", file));
      });
  };

  await connect();
};
