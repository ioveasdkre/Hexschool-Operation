import express from "express";
import mongoose from "mongoose";
import { BookModel } from "../models/bookModel";

const router = express.Router();

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

router.get("/:authorId", async function (req, res) {
  try {
    const authorId = req.params.authorId; // req.params 讀取動態參數

    if (!isValidObjectId(authorId)) {
      return res.status(400).json({ status: "Invalid author format" });
    }
    console.log("測試");
    const books = await BookModel.find({ author: authorId }).populate(
      "author",
      "name"
    );

    // 檢查是否有回傳任何書籍
    if (books.length === 0) {
      return res.status(404).json({ status: "Books not found" });
    }

    return res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Server error",
    });
  }
});

export { router as bookRoute };
