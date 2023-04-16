import express, { Request, Response, NextFunction } from "express";
const app = express();

app.get("/", function (_req: Request, res: Response) {
  res.status(200).json({
    status: "success",
    message: "你目前造訪到首頁",
  });
});

app.use(function (_req: Request, _res: Response, next: NextFunction) {
  console.log("有人進來了");
  // @ts-ignore
  kk();
  next();
});

app.use(function (_req: Request, res: Response, _next: NextFunction) {
  console.log("前面都沒發生錯誤會到這裡");
  res.status(404).json({
    status: "false",
    message: "您的路由不存在",
  });
});

app.use(function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("錯訊訊息守門員：", err.name);
  res.status(500).json({
    err: err.name,
  });
});

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);
