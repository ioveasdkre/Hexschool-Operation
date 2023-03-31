// Day 25 - bcrypt.js 密碼加解密
// https://hackmd.io/8mhsVf6sSzafoa9MEBrNJg
import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { userRouter } from "./userRouters";

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

// 啟用 JSON 解析中介軟體
app.use(express.json());

app.use("/user", userRouter);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
