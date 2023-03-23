import { model } from "mongoose";
import { IAuthor } from "../interfaces/authorInterface";
import { authorSchema } from "../schema/authorSchem";

const AuthorModel = model<IAuthor>("Author", authorSchema);

export { AuthorModel };
