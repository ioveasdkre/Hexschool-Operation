import { model } from "mongoose";
import { IPost } from "../interfaces/models/postInterface";
import { postSchema } from "../schemas/postSchema";

export const Post = model<IPost>("Post", postSchema);
