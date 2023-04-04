import { PostController } from "../controllers/postContorller";
import express from "express";

const PostRouter = express.Router();

// 改為使用 Express 的路由處理
PostRouter.route("")
  .get(PostController.getPosts)
  .post(PostController.createPost)
  .delete(PostController.deleteAllPosts);

PostRouter.route("/:postId")
  .get(PostController.getPost)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost)
  .options(PostController.optionsPost);

export { PostRouter };
