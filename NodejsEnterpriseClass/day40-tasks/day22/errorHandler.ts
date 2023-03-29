// 引入 Request, Response, NextFunction 與 ErrorRequestHandler 類型定義
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// 定義 AppError 類型
interface AppError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
}

// 定義 appError 函式，將參數類型定義為相應的類型
const appError = (
  httpStatus: number,
  errMessage: string,
  next: NextFunction
): void => {
  // 建立一個新的 AppError 物件
  const error: AppError = new Error(errMessage) as AppError;

  // 設定錯誤的狀態碼
  error.statusCode = httpStatus;

  // 設定 isOperational 為 true，表示此錯誤為已知的可操作錯誤
  error.isOperational = true;

  // 將錯誤傳遞給下一個中間件函式
  next(error);
};

// 定義錯誤處理中間件函式，並將參數類型定義為相應的類型
const errorHandler: ErrorRequestHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // 設定預設的錯誤狀態碼與錯誤類型
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // 回應錯誤訊息給客戶端
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// 定義 handleErrorAsync 函式
const handleErrorAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: Error) => {
      return next(error);
    });
  };
};

export { appError, errorHandler, handleErrorAsync };
