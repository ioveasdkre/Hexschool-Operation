import { Schema } from "mongoose";
import { IPost } from "../interfaces/models/postInterface";

const postSchema = new Schema<IPost>({
  content: {
    type: String,
    required: [true, "Content 未填寫"],
  },
  image: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "貼文姓名未填寫"],
  },
});

export { postSchema };
