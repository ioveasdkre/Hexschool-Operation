import express from "express";
import { connectToDatabase } from "./connections/mongoDB";
import { handle404Error, handleErrors } from "./middlewares/errorsMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { PostRouter } from "./routers/postRouter";
import { UserRouter } from "./routers/userRouter";

const app = express();

connectToDatabase();

// 啟用 JSON 解析中介軟體
app.use(express.json());

app.use("/posts", PostRouter);
app.use("/user", authMiddleware, UserRouter);

app.get("/test", (_req, _res) => {
  throw new Error("路由測試發生錯誤");
});

// 處理 404
app.use(handle404Error);

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(handleErrors);

export default app;
