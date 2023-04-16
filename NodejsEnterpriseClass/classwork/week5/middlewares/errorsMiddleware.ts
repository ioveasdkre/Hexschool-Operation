import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../helpers/handleError";

const handle404Error = (_req: Request, res: Response) => {
  handleResponse(res, 404, "error", "無此頁面資訊");
};

const handleErrors = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err?.stack);
  handleResponse(res, 500, "error", "系統錯誤，請聯絡系統管理員");
};

export { handle404Error, handleErrors };
