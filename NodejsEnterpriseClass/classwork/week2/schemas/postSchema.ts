import { Schema } from "mongoose";
import { IPost } from "../interfaces/models/postInterface";

const postSchema = new Schema<IPost>({
  title: { type: String, required: [true, "Title is required"] },
  content: { type: String, required: [true, "Content is required"] },
  author: { type: String, required: [true, "Author is required"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  tags: { type: [String], required: [true, "Tags is required"] },
  imageUrl: { type: String },
});

export { postSchema };
