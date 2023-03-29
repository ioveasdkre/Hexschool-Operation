// Day 23 - development 及 production 環境變數指令、客製錯誤訊息
// https://hackmd.io/Rjn89zAcTPCBfRnetjuK-Q?view
import express, { Request, Response, NextFunction } from "express";
import http from "http";

const app = express();

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  message: string;
  isOperational: boolean;
}

// express 錯誤處理
// 自己設定的 err 錯誤
const resErrorProd = (err: ErrorWithStatusCode, res: Response) => {
  if (err.isOperational) {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    // log 紀錄
    console.error("出現重大錯誤", err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: "error",
      message: "系統錯誤，請恰系統管理員",
    });
  }
};

// 開發環境錯誤
const resErrorDev = (err: ErrorWithStatusCode, res: Response) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

app.get("", function (_req: Request, _res: Response, next: NextFunction) {
  throw new Error("test Error");
  next();
});

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(function (
  err: ErrorWithStatusCode,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resErrorDev(err, res);
  }
  // production
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  resErrorProd(err, res);
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
