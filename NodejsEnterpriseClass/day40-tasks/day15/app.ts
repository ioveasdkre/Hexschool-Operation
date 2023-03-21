// Day 15 - req.body

// https://hackmd.io/uCk2MHZzQ2WxVl3DrdAQ9w?view

import express from "express";
import mongoose from "mongoose";
import { productsRoute } from "./routes/productsRoute";

const app = express();

// 啟用 JSON 解析中介軟體
app.use(express.json());

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));


app.use("/products", productsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
