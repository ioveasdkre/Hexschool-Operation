import { model } from "mongoose";
import { IBook } from "../interfaces/bookInterface";
import { bookSchema } from "../schema/bookSchem";

const BookModel = model<IBook>("Book", bookSchema);

export { BookModel };
