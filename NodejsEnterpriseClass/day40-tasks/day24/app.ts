// Day 24 - 非同步錯誤管理
// https://hackmd.io/RkfXM4h-TJ-mktw9jYjrsw
import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { postRouter } from "./postRouters";

const app = express();

dotenv.config({ path: path.join(__dirname, "../../config.env") });

if (!process.env.DATABASE) {
  throw new Error(
    "Database connection string not found in environment variables."
  );
}

const DB = process.env.DATABASE;

(async function connectToDatabase() {
  try {
    await connect(DB);
    console.log("資料庫連線成功");
  } catch (error) {
    console.log(error);
  }
})();

app.use("/", postRouter);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
