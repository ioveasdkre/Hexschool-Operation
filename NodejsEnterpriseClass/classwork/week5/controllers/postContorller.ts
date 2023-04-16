import { Request, Response } from "express";
import { IPost } from "../interfaces/models/postInterface";
import { IHeaders } from "../interfaces/utils/headerInterface";
import { Post } from "../models/index";
import { isValidObjectId } from "../utils/utils";
import { handleSuccess } from "../helpers/handleSuccess";
import { handleError } from "../helpers/handleError";
import { headers } from "../helpers/headers";

class PostController {
  public static async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const query: { timeSort?: string; q?: string } = req.query;

      // 使用三元運算子判斷是否為 asc (由舊至新)，若是則由舊至新排列，否則由新至舊排列
      // const timeSort = query.timeSort === "asc" ? "asc" : "desc";

      const timeSort = query.timeSort === "asc" ? "createdAt" : "-createdAt";

      const q = query.q !== undefined ? { content: new RegExp(query.q) } : {};

      const posts: IPost[] = await Post.find(q)
        .populate({
          path: "user",
          select: "name photo",
        })
        .sort(timeSort);

      if (!posts) return handleError(res);

      return handleSuccess<IPost[]>(res, posts);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async createPost(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!isValidObjectId(data.userId)) return handleError(res);

      if (data.content === undefined) return handleError(res);

      const newPost: IPost = await Post.create<Partial<IPost>>({
        content: data.content,
        image: data.image,
        likes: data.likes,
        user: data.userId,
      });

      if (!newPost) return handleError(res);

      return handleSuccess<IPost>(res, newPost);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) return handleError(res);

      handleSuccess<null>(res, null);
    } catch (error) {
      handleError(res, error);
    }
  }

  public static async deleteAllPosts(_req: Request, res: Response) {
    try {
      await Post.deleteMany();
      return handleSuccess<null>(res, null);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const data = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          content: data.content,
          image: data.image,
          likes: data.likes,
          updatedAt: new Date(), // 必要設定，確保 createdAt屬性保持不變
        },
        {
          new: true, // 回傳更新的文檔
        }
      );

      if (!updatedPost) return handleError(res);

      return handleSuccess<IPost>(res, updatedPost);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async getPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const post = await Post.findById(postId).populate({
        path: "user",
        select: "name photo",
      });

      if (!post) return handleError(res);

      return handleSuccess<IPost>(res, post);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async optionsPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      return handleSuccess<IHeaders>(res, headers);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export { PostController };
