import express from "express";
import { errorTest, errorLogin } from "../../test/errorTests";
import { connectToDatabase } from "./connections/mongoDB";
import {
  handleUncaughtException,
  handleUnhandledRejection,
} from "./helpers/handleError";
import { handle404Error, handleErrors } from "./middlewares/errorsMiddleware";
import { PostRouter, UserRouter } from "./routers/index";

const app = express();

connectToDatabase();

// 啟用 JSON 解析中介軟體
app.use(express.json());

app.use("/posts", PostRouter);
app.use("/user", UserRouter);

errorTest(1); // 錯誤測試

app.use(errorLogin); // 自訂錯誤訊息. 參 day22

// 處理 404
app.use(handle404Error);

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(handleErrors);

// 補捉程式錯誤
process.on("uncaughtException", handleUncaughtException); // 參 day21

// 補捉未處理的 catch
process.on("unhandledRejection", handleUnhandledRejection); // 參 day21

export default app;
