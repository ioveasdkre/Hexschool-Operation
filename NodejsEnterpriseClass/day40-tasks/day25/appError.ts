import { NextFunction } from "express";

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

export { appError };
