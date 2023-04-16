// Day 22 - 自訂錯誤訊息
// https://hackmd.io/fVK_-vl1Rr6KkJgY9uTWeA

import express, { Request, Response, NextFunction } from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { appError, errorHandler, handleErrorAsync } from "./errorHandler";
import { Post } from "./post";

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

app.get(
  "/",
  handleErrorAsync(async (req: Request, res: Response, _next: NextFunction) => {
    // 自訂未通過登入驗證的錯誤
    // return next(appError(401, "您並未登入", next));

    const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt";
    const q =
      typeof req.query.q === "string"
        ? { content: new RegExp(req.query.q) }
        : {};
    const post = await Post.find(q)
      .populate({
        path: "user",
        select: "name photo",
      })
      .sort(timeSort);

    res.status(200).json({
      status: "success",
      results: post.length,
      data: {
        post,
      },
    });
  })
);

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    if (!data.content) {
      // 將以下改為 appError 自訂錯誤回饋
      return next(appError(400, "content 欄位為必填", next));
    }
    const newPost = await Post.create({
      user: data.user,
      content: data.content,
      tags: data.tags,
      type: data.type,
    });

    res.status(200).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
});

// 使用 errorHandler 中間件
app.use(errorHandler);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
