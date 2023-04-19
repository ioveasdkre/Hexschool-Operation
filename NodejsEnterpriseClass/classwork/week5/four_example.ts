import express, { Request, Response, NextFunction } from "express";
const app = express();

app.get("/", function (_req: Request, _res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    kk();
  } catch (err) {
    next(err);
  }
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
