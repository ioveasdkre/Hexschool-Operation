// Day 21 - uncaughtException、unhandledRejection
// https://hackmd.io/qZdghVhCQjGFu5wNDFXIjA?view

import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { throwUnhandledRejection } from "./test-errors";

const app = express();

app.get(
  "/throwUnhandledRejection",
  function (_req: Request, _res: Response, next: NextFunction) {
    throwUnhandledRejection();
    next();
  }
);

// throw new Error("This is an unhandled exception!"); // 觸發 uncaughtException

// 程式出現重大錯誤時
process.on("uncaughtException", (err: Error) => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error("Uncaughted Exception！");
  console.error(err);
  process.exit(1);
});

// 未捕捉到的 catch
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("未捕捉到的 rejection：", promise, "原因：", reason);
  // 記錄於 log 上
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
