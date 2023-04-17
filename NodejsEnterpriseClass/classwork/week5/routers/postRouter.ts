import express from "express";
import { PostController } from "../controllers/postContorller";
import { handleErrorAsync } from "../middlewares/errorHandler";

const PostRouter = express.Router();

// 改為使用 Express 的路由處理
PostRouter.route("")
  .get(handleErrorAsync(PostController.getPosts))
  .post(handleErrorAsync(PostController.createPost))
  .delete(handleErrorAsync(PostController.deleteAllPosts));

PostRouter.route("/:postId")
  .get(handleErrorAsync(PostController.getPost))
  .patch(handleErrorAsync(PostController.updatePost))
  .delete(handleErrorAsync(PostController.deletePost))
  .options(handleErrorAsync(PostController.optionsPost));

export { PostRouter };
