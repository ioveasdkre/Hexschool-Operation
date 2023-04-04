import { Request, Response } from "express";
import { IUser } from "../interfaces/models/userInterface";
import { User } from "../models/index";
import { isValidObjectId } from "../utils/utils";
import { handleSuccess } from "../helpers/handleSuccess";
import { handleError } from "../helpers/handleError";

class UserController {
  public static async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!isValidObjectId(userId)) return handleError(res);

      const user = await User.findById(userId);

      if (!user) return handleError(res);

      return handleSuccess<IUser>(res, user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async createUser(req: Request, res: Response) {
    try {
      const data = req.body;

      if (data.name === undefined) return handleError(res);

      const newUser = await User.create({
        name: data.name,
        email: data.email,
        photo: data.photo,
      });

      if (!newUser) return handleError(res);

      return handleSuccess<IUser>(res, newUser);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!isValidObjectId(userId)) return handleError(res);

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) return handleError(res);

      handleSuccess<null>(res, null);
    } catch (error) {
      handleError(res, error);
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!isValidObjectId(userId)) return handleError(res);

      const data = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name: data.name,
          email: data.email,
          photo: data.photo,
        },
        {
          new: true, // 回傳更新的文檔
        }
      );

      if (!updatedUser) return handleError(res);

      return handleSuccess<IUser>(res, updatedUser);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export { UserController };
