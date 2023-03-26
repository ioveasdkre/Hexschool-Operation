import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { PostRouter } from "./routers/postRouter";
import { UserRouter } from "./routers/userRouter";
import { handleNotFoundError } from "./utils/handleError";

const app = express();

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

// 啟用 JSON 解析中介軟體
app.use(express.json());

// 定義一個中間件函數
const login = (req: Request, res: Response, next: NextFunction) => {
  // 在這裡對請求進行驗證或處理
  const token = req.headers.authorization;
  if (!token) {
    return handleNotFoundError(res, 401, "error", "未驗證的用戶");
  }
  // 驗證通過，執行下一個處理程序
  return next();
};

app.use("/posts", PostRouter);
app.use("/user", login, UserRouter);

app.get("/test", (_req, _res) => {
  throw new Error("路由測試發生錯誤");
});

// 處理 404
app.use(function (_req, res, _next) {
  handleNotFoundError(res, 404, "error", "無此頁面資訊");
});

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err?.stack);
  handleNotFoundError(res, 500, "error", "系統錯誤，請聯絡系統管理員");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
