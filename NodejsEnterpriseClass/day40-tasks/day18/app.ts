// Day 18 - 取得資料搭配 sort()、limit()

// https://hackmd.io/f-wGFdjqQeGpaqJE_Ufo3w
import express from "express";
import mongoose from "mongoose";
import { postRouter } from "./routers/postRouter";

const app = express();

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

// 啟用 JSON 解析中介軟體
app.use(express.json());

app.use("/", postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
