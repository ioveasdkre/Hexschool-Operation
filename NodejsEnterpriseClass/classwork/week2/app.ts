import http, { IncomingMessage, ServerResponse } from "http";
import { connectToDatabase } from "./connections/mongoDB";
import { PostRouter } from "./routers/postRouter";
// import { init } from "./controllers/postContorller";

// init();

connectToDatabase();

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  PostRouter.handleRequest(req, res);
};

const server = http.createServer(requestListener);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
