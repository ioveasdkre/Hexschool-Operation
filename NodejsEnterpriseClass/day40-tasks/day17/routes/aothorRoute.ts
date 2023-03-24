import express from "express";
import { IAuthor } from "../interfaces/authorInterface";
import { IBook } from "../interfaces/bookInterface";
import { AuthorModel } from "../models/authorModel";
import { BookModel } from "../models/bookModel";

const router = express.Router();

router.post("", async function (req, res) {
  try {
    const data = req.body;

    if (!!data.name) {
      // 使用 mongoose 將 data 新增至資料庫
      const aothor = await AuthorModel.create<IAuthor>({
        name: data.name,
        introduction: data.introduction,
      });

      const book = await BookModel.create<IBook>({
        author: aothor._id,
        title: data.title,
      });

      return res.status(200).json({
        status: "success",
        data: book,
      });
    } else {
      return res.status(404).json({ status: "作者未填寫" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server error",
    });
  }
});

export { router as authorRouter };
