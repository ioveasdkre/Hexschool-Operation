import { Response } from "express";
import { headers } from "./headers";

const handleError = (
  res: Response,
  err?: Error | unknown,
  state: number = 400
) => {
  res.status(state);
  let message = "";
  if (err instanceof Error) {
    message = err.message;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  res.json({
    status: "false",
    message,
  });
};

const handleResponse = (
  res: Response,
  statusCode: number,
  status: string,
  message: string
) => {
  res.status(statusCode);
  res.set(headers);
  res.json({
    status,
    message,
  });
};

export { handleError, handleResponse };
