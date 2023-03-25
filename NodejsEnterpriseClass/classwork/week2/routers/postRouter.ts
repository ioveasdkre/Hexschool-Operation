import { IncomingMessage, ServerResponse } from "http";
import { PostController } from "../controllers/postContorller";
import { handleNotFoundError } from "../utils/handleError";

class PostRouter {
  public static async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    switch (url) {
      case "/posts":
        if (req.method === "GET") {
          PostController.getAllPosts(req, res);
        } else if (req.method === "POST") {
          PostController.createPost(req, res);
        } else if (req.method === "DELETE") {
          PostController.deleteAllPosts(req, res);
        } else {
          handleNotFoundError(res);
        }
        break;
      default:
        if (method === "DELETE" && url?.startsWith("/posts/")) {
          PostController.deletePost(req, res);
        } else if (method === "PATCH" && url?.startsWith("/posts/")) {
          PostController.updatePost(req, res);
        } else if (method === "GET" && url?.startsWith("/posts/")) {
          PostController.getPost(req, res);
        } else if (method === "OPTIONS" && url?.startsWith("/posts/")) {
          PostController.optionsPost(req, res);
        } else {
          handleNotFoundError(res);
        }
        break;
    }
  }
}

export { PostRouter };
