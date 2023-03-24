import { IBook } from "../interfaces/bookInterface";
import { Schema, Types } from "mongoose";

const bookSchema = new Schema<IBook>({
  author: { type: Types.ObjectId, ref: "Author" },
  title: String,
});

export { bookSchema };
