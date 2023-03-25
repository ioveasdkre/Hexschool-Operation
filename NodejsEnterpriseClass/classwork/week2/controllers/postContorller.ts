import { IncomingMessage, ServerResponse } from "http";
import { IPost } from "../interfaces/models/postInterface";
import { IHeaders } from "../interfaces/utils/headerInterface";
import { Post } from "../models/postModel";
import { isValidObjectId } from "../utils/utils";
import { handleSuccess } from "../utils/handleSuccess";
import { handleError } from "../utils/handleError";
import { headers } from "../utils/headers";

const init = async () => {
  const AllPost = await Post.find();
  console.log(AllPost);
};

class PostController {
  public static async getAllPosts(
    _req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const post: IPost[] = await Post.find();
      return handleSuccess<IPost[]>(res, post);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async createPost(req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        if (data.content === undefined) return handleError(res);
        console.log(data);
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

  public static async deletePost(req: IncomingMessage, res: ServerResponse) {
    try {
      const postId = req.url?.split("/")?.[2] ?? "";

      if (!isValidObjectId(postId)) return handleError(res);

      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) return handleError(res);

      handleSuccess<null>(res, null);
    } catch (error) {
      handleError(res, error);
    }
  }

  public static async deleteAllPosts(
    _req: IncomingMessage,
    res: ServerResponse
  ) {
    try {
      await Post.deleteMany();
      return handleSuccess<null>(res, null);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async updatePost(req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const postId = req.url?.split("/")?.[2] ?? "";

        if (!isValidObjectId(postId)) return handleError(res);

        const data = JSON.parse(body);

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
    });
  }

  public static async getPost(req: IncomingMessage, res: ServerResponse) {
    try {
      const postId = req.url?.split("/")?.[2] ?? "";

      if (!isValidObjectId(postId)) return handleError(res);

      const post = await Post.findById(postId);

      if (!post) return handleError(res);

      return handleSuccess<IPost>(res, post);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async optionsPost(req: IncomingMessage, res: ServerResponse) {
    try {
      const postId = req.url?.split("/")?.[2] ?? "";

      if (!isValidObjectId(postId)) return handleError(res);

      return handleSuccess<IHeaders>(res, headers);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export { init, PostController };
