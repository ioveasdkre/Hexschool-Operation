import express, { Request, Response, NextFunction } from "express";
import { appError } from "./appError";
import { handleErrorAsync } from "./handleErrorAsync";
import { hashPassword, verifyPassword } from "./passwordUtils";
import { User } from "./userModel";

const router = express.Router();

router.post(
  "",
  handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    let { email, password, confirmPassword, name } = req.body;

    if (password !== confirmPassword) appError(400, "密碼不匹配", next);

    const hashedPassword = await hashPassword(password);
    const isMatch = await verifyPassword(password, hashedPassword);

    if (!isMatch) appError(400, "輸入的密碼不正確", next);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  })
);

router.put(
  "/:userId",
  handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      appError(400, "新密码不匹配", next);
    }

    // 查询用户并验证原密码
    const user = await User.findById(userId);

    if (!user) {
      return appError(404, "找不到用户", next);
    }

    const isMatch = await verifyPassword(oldPassword, user.password);

    if (!isMatch) {
      appError(401, "原密码不正确", next);
    }

    // 加密新密码并更新用户密码
    const hashedPassword = await hashPassword(newPassword);

    if (user) {
      user.password = hashedPassword;
      await user.save();
    } else {
      appError(404, "找不到用户", next);
    }

    res.status(200).json({
      status: "success",
      message: "密码修改成功",
    });
  })
);

export { router as userRouter };
