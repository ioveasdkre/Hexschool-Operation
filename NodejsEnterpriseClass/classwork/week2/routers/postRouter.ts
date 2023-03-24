import { IncomingMessage, ServerResponse } from "http";
import { PostController } from "../controllers/postContorller";
import { handleNotFoundError } from "../handleError";

class PostRouter {
  public static async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    switch (url) {
      case "/posts":
        if (method === "GET") {
          PostController.getAllPosts(req, res);
        } else if (method === "POST") {
          PostController.createPost(req, res);
        } else {
          handleNotFoundError(res);
        }
        break;
      default:
        if (method === "DELETE" && url?.startsWith("/posts/")) {
          PostController.deletePost(req, res);
        } else if (req.method == "OPTIONS") {
          PostController.optionsPost(req, res);
        } else {
          handleNotFoundError(res);
        }
        break;
    }
  }
}

export { PostRouter };
