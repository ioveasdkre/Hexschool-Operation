import { model } from "mongoose";
import { IAuthor } from "../interfaces/authorInterface";
import { authorSchema } from "../schemas/authorSchem";

const AuthorModel = model<IAuthor>("Author", authorSchema);

export { AuthorModel };
