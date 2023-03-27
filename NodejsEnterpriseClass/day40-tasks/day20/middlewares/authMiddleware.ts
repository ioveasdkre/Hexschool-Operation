import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../helpers/handleError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 在這裡對請求進行驗證或處理
  const authToken = req.headers.authorization;
  if (!authToken) {
    return handleResponse(res, 401, "error", "未驗證的用戶");
  }
  // 驗證通過，執行下一個處理程序
  return next();
};

export { authMiddleware };
