import { Types } from "mongoose";

interface IBook {
  author: { _id: Types.ObjectId };
  title: string;
}

export { IBook };
