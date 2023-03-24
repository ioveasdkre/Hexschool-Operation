import { model } from "mongoose";
import { IPost } from "../interfaces/postInterface";
import { postSchema } from "../schemas/postSchema";

const Post = model<IPost>("Post", postSchema);

export { Post };
