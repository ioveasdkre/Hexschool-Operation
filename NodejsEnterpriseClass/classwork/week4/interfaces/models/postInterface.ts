import { Schema } from "mongoose";

interface IPost {
  content: string;
  image: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  user: { _id: Schema.Types.ObjectId };
}

export { IPost };
