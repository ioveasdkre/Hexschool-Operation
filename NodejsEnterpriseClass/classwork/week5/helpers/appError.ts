import { NextFunction } from "express";
import { AppError } from "../interfaces/helpers/appErrorInterface";

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
