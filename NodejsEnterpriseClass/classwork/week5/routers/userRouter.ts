import { UserController } from "../controllers/userContorller";
import express from "express";

const UserRouter = express.Router();

// 改為使用 Express 的路由處理
UserRouter.route("").post(UserController.createUser);

UserRouter.route("/:userId")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export { UserRouter };
