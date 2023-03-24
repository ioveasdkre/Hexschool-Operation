import express from "express";
import { Post } from "../models/postModel";

const router = express.Router();

router.get("", async function (req, res) {
  try {
    const query: { timeSort?: string; limit?: string } = req.query;
    // 使用三元運算子判斷是否為 asc (由舊至新)，若是則由舊至新排列，否則由新至舊排列
    const timeSort = query.timeSort === "asc" ? "asc" : "desc";
    // 帶入網址列的參數
    const limit = Number(query.limit);

    if (isNaN(limit) || !Number.isInteger(limit)) {
      return res.status(400).json({
        status: "Bad request",
      });
    }

    const posts = await Post.find()
      .sort({ title: timeSort })
      .limit(limit); /* 請填入答案 */

    if (posts.length === 0) {
      return res.status(404).json({ status: "posts not found" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "Server error",
    });
  }
});

export { router as postRouter };
