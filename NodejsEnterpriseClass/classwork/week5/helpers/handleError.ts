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

// 補捉程式錯誤
function handleUncaughtException(err: Error) {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error("Uncaughted Exception！");
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack); // node獨有
  process.exit(1);
}

// 補捉未處理的 catch
function handleUnhandledRejection(reason: any, promise: Promise<any>) {
  console.error("未捕捉到的 rejection：", promise, "原因：", reason);
  // 記錄於 log 上
}

export {
  handleError,
  handleResponse,
  handleUncaughtException,
  handleUnhandledRejection,
};
