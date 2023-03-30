import express, { Request, Response, NextFunction } from "express";
import { handleErrorAsync } from "./handleErrorAsync";

const router = express.Router();

const getPosts = async (_req: Request, _res: Response, _next: NextFunction) => {
  throw new Error("test error");
};

router.get("/", handleErrorAsync(getPosts));

export { router as postRouter };
