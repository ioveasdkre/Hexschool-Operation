// 中介設計

import express, { Request, Response, NextFunction } from "express";
const app = express();

app.get("/", function (_req: Request, res: Response) {
  res.status(200).json({
    status: "success",
    message: "你目前造訪到首頁",
  });
});

const checkKeyword = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.query.q) {
    next();
  } else {
    res.status(400).json({
      message: `您並未輸入關鍵字`,
    });
  }
};

const isLogin = function (_req: Request, _res: Response, next: NextFunction) {
  console.log("確認是否登入");
  next();
};

app.get("/search", isLogin, checkKeyword, function (req, res) {
  res.status(200).json({
    status: "success",
    keyword: `你搜尋到的是${req.query.q}`,
  });
});

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);
