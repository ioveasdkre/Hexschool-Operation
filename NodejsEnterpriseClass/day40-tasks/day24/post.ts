import { Schema, model } from "mongoose";

interface IPost {
  content: string;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  content: String,
});

const Post = model<IPost>("Post", postSchema);

export { Post };
