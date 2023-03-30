import express, { Request, Response, NextFunction } from "express";
import { handleErrorAsync } from "./handleErrorAsync";
// import { Post } from "./post";

const router = express.Router();

const getPosts = async (_req: Request, _res: Response, _next: NextFunction) => {
  throw new Error("test error");
  // const post = await Post.find();
  // res.status(200).json({
  //   status: "success",
  //   results: post.length,
  //   data: {
  //     post,
  //   },
  // });
};

router.get("/", handleErrorAsync(getPosts));

export { router as postRouter };
