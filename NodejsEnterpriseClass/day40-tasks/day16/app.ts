// Day 16 - req.params 取得特定資料

// https://hackmd.io/WZnOedvHQ2G6aS592cxpVg

import express from "express";
import mongoose from "mongoose";
import { Post } from "./postModel";

const app = express();

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// : 動態參數
app.get("/:id", async function (req, res) {
  try {
    const id = req.params.id; // req.params 讀取動態參數

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      return res.status(200).json({
        message: `success`,
        data: post,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
