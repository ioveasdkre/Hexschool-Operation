import express from "express";
const router = express.Router();

router.get("", (_req, res) => {
  res.send("全體動態牆");
});

router.post("", (_req, res) => {
  res.send("新增一則貼文");
});

export { router as postsRouter };