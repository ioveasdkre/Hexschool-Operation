import { IncomingMessage, ServerResponse } from "http";
import "./connections/mongoDB";
import { PostRouter } from "./routers/postRouter";
// import { init } from "./controllers/postContorller";

// init();

const app = async (req: IncomingMessage, res: ServerResponse) => {
  PostRouter.handleRequest(req, res);
};

export default app;
