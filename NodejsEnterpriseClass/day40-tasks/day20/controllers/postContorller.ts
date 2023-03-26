import { Request, Response } from "express";
import { IPost } from "../interfaces/models/postInterface";
import { IHeaders } from "../interfaces/utils/headerInterface";
import { Post } from "../models/postModel";
import { isValidObjectId } from "../utils/utils";
import { handleSuccess } from "../utils/handleSuccess";
import { handleError } from "../utils/handleError";
import { headers } from "../utils/headers";

class PostController {
  public static async getAllPosts(_req: Request, res: Response): Promise<void> {
    try {
      const posts: IPost[] = await Post.find();

      if (!posts) return handleError(res);

      return handleSuccess<IPost[]>(res, posts);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async createPost(req: Request, res: Response) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        if (data.content === undefined) return handleError(res);

        const newPost: IPost = await Post.create({
          title: data.title,
          content: data.content,
          author: data.author,
          likes: data.likes,
          tags: data.tags,
          imageUrl: data.imageUrl,
        });

        if (!newPost) return handleError(res);

        return handleSuccess<IPost>(res, newPost);
      } catch (error) {
        return handleError(res, error);
      }
    });
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
          title: data.title,
          content: data.content,
          author: data.author,
          likes: data.likes,
          tags: data.tags,
          imageUrl: data.imageUrl,
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

      const post = await Post.findById(postId);

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
