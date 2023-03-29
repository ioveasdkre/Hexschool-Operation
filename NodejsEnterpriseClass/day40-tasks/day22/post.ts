import { Schema, model, Types } from "mongoose";

interface IPost {
  content: string;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  content: String,
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Post = model<IPost>("Post", postSchema);

export { Post };
