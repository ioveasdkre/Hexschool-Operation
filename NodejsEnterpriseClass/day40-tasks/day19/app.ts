// Day 19 - Middleware

// https://hackmd.io/phvQSEsgQTicgXAMjkxL_Q

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/user.router";

const app = express();

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

// 啟用 JSON 解析中介軟體
app.use(express.json());

const login = function (req: Request, res: Response, next: NextFunction) {
  const url = req.url;
  if (url !== "/") {
    // throw new Error("除數不能為零");
    next(); // 進入下一步，若不設定會卡住。
  } else {
    res.status(400).send("你的登入資料有錯");
  }
};

app.use("/user", login, userRouter);

// 處理 404
app.use(function (_req, res, _next) {
  res.status(404).send("抱歉，您的頁面找不到");
});

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err?.stack);
  res.status(500).send("伺服器繁忙中，請稍後在試");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
