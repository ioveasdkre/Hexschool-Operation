import { IAuthor } from "../interfaces/authorInterface";
import { Schema } from "mongoose";

const authorSchema = new Schema<IAuthor>(
  {
    name: String,
    introduction: String,
  },
  { versionKey: false }
);

export { authorSchema };
