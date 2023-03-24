import { IncomingMessage, ServerResponse } from "http";
import { IPost } from "../interfaces/postInterface";
import { Post } from "../models/postModel";
import { validateAndParsePostId } from "../utils/utils";
import { handleError } from "../handleError";
import { handleSuccess } from "../handleSuccess";

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
      handleSuccess<IPost[]>(res, post);
    } catch (error) {
      handleError(res, error);
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

        if (data.content !== undefined) {
          console.log(data);
          const newPost: IPost = await Post.create({
            title: data.title,
            content: data.content,
            author: data.author,
            likes: data.likes,
            tags: data.tags,
            imageUrl: data.imageUrl,
          });

          handleSuccess<IPost>(res, newPost);
        } else {
          handleError(res);
        }
      } catch (error) {
        handleError(res, error);
      }
    });
  }

  public static async deletePost(req: IncomingMessage, res: ServerResponse) {
    try {
      const { url } = req;

      if (!url) {
        handleError(res);
        return;
      }

      const postId = validateAndParsePostId(url, res);
      if (!postId) {
        return;
      }

      await Post.findByIdAndDelete(postId);
      handleSuccess<null>(res, null);
    } catch (error) {
      handleError(res, error);
    }
  }

  public static async optionsPost(_req: IncomingMessage, res: ServerResponse) {
    try {
      handleSuccess(res);
    } catch (error) {
      handleError(res, error);
    }
  }
}

export { init, PostController };
