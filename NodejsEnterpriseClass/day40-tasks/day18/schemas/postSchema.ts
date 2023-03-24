import { Schema } from "mongoose";
import { IPost } from "../interfaces/postInterface";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export { postSchema };
