import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../helpers/handleError";
import { ErrorWithStatusCode } from "../interfaces/middlewares/errorsMiddlewareInterface";

const handle404Error = (_req: Request, res: Response) => {
  handleResponse(res, 404, "error", "無此頁面資訊");
};

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
    console.error(err?.stack);
    handleResponse(res, 500, "error", "系統錯誤，請聯絡系統管理員");
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

// 客製錯誤訊息. 參 day23
const handleErrors = (
  err: ErrorWithStatusCode,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resErrorDev(err, res);
  }
  // production
  else if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  resErrorProd(err, res);
};

export { handle404Error, handleErrors };
